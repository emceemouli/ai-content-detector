// utils/textAnalysis.ts

interface AnalysisResult {
  score: number;
  findings: string[];
  patterns: {
    repetitive: boolean;
    formal: boolean;
    structured: boolean;
    statistical: boolean;
    aiPhrases: boolean;
  };
  confidence: number;
  metrics: {
    wordVariety: number;
    avgSentenceLength: number;
    patternDensity: number;
    complexityScore: number;
    repetitivePatterns: number;
  };
}

type PatternMatchType = 'transitions' | 'formal' | 'academic';
type PatternMatches = Record<PatternMatchType, number>;

export const analyzeText = (text: string): AnalysisResult => {
  // Normalize text
  const normalizedText = text.toLowerCase();
  const words = normalizedText.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const uniqueWords = new Set(words);

  let score = 0;
  let findings: string[] = [];
  let confidence = 0;

  // Pattern detection with enhanced patterns
  const patterns = {
    transitions: {
      patterns: [
        'furthermore', 'moreover', 'additionally', 'consequently', 'thus',
        'hence', 'therefore', 'in addition', 'as a result', 'subsequently',
        'accordingly', 'similarly', 'in contrast', 'however', 'nevertheless'
      ],
      weight: 0.25
    },
    formal: {
      patterns: [
        'utilize', 'implementation', 'facilitate', 'regarding', 'numerous',
        'optimal', 'demonstrate', 'indicate', 'significant', 'fundamental',
        'methodology', 'paradigm', 'conceptualize', 'emphasize'
      ],
      weight: 0.2
    },
    academic: {
      patterns: [
        'it must be noted that', 'it should be noted that', 'it is worth noting that',
        'studies indicate that', 'research suggests that', 'evidence demonstrates that',
        'analysis reveals that', 'data indicates that', 'findings suggest that'
      ],
      weight: 0.3
    }
  };

  // Initialize pattern matches with typed structure
  const patternMatches: PatternMatches = {
    transitions: 0,
    formal: 0,
    academic: 0
  };

  // Count pattern occurrences with type safety
  Object.entries(patterns).forEach(([type, { patterns: patternList, weight }]) => {
    patternList.forEach(pattern => {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      const matches = (text.match(regex) || []).length;
      if (matches > 0) {
        score += matches * weight;
        patternMatches[type as PatternMatchType] += matches;
      }
    });
  });

  // Calculate metrics
  const metrics = {
    wordVariety: uniqueWords.size / words.length,
    avgSentenceLength: words.length / sentences.length,
    patternDensity: (patternMatches.transitions + patternMatches.formal + patternMatches.academic) / words.length,
    complexityScore: calculateComplexity(text, sentences),
    repetitivePatterns: calculateRepetitivePatterns(sentences)
  };

  // Generate findings based on metrics
  if (metrics.wordVariety < 0.4) {
    findings.push('Limited vocabulary variety detected');
    score += 0.15;
  }

  if (metrics.avgSentenceLength > 20) {
    findings.push('Consistently complex sentence structures');
    score += 0.15;
  }

  if (metrics.patternDensity > 0.1) {
    findings.push('High density of AI-typical patterns detected');
    score += 0.2;
  }

  // Calculate confidence based on multiple factors
  confidence = calculateConfidence(metrics, findings.length);

  return {
    score: Math.min(score, 1),
    findings,
    patterns: {
      repetitive: metrics.repetitivePatterns > 0.3,
      formal: patternMatches.formal > 2,
      structured: metrics.avgSentenceLength > 20,
      statistical: hasStatisticalPatterns(text),
      aiPhrases: patternMatches.academic > 2
    },
    confidence,
    metrics
  };
};

const calculateComplexity = (text: string, sentences: string[]): number => {
  const complexWords = text.split(/\s+/).filter(word => 
    word.length > 6 || /(?:[^laeiouy]es|ed|[^laeiouy]e)$/.test(word)
  ).length;

  const complexSentences = sentences.filter(sent => 
    sent.split(/\s+/).length > 20 || 
    /\b(although|however|nevertheless|furthermore|additionally)\b/i.test(sent)
  ).length;

  return (complexWords / text.split(/\s+/).length + complexSentences / sentences.length) / 2;
};

const calculateRepetitivePatterns = (sentences: string[]): number => {
  const patterns = sentences.map(s => s.split(' ')[0].toLowerCase());
  const repetitions = patterns.filter((p, i) => patterns.indexOf(p) !== i).length;
  return repetitions / sentences.length;
};

const hasStatisticalPatterns = (text: string): boolean => {
  const patterns = [
    /\d{1,3}(?:\.\d{1,2})?%/,
    /\d+\s*percent/,
    /majority|minority|significant portion|substantial number/,
    /\d+\s*times/,
    /increased by|\d+\s*fold/
  ];

  return patterns.some(pattern => pattern.test(text));
};

const calculateConfidence = (metrics: any, findingsCount: number): number => {
  let confidence = 0;
  
  // Weight different factors
  confidence += metrics.wordVariety < 0.4 ? 0.2 : 0;
  confidence += metrics.patternDensity > 0.1 ? 0.3 : 0;
  confidence += findingsCount / 10;

  return Math.min(confidence + 0.3, 1); // Base confidence of 0.3
};