import { 
  AnalysisResult, 
  PatternScore, 
  StructuralAnalysis, 
  LanguageAnalysis 
} from '@/types/analysisTypes';

const getEmptyResult = (): AnalysisResult => ({
  score: 0,
  findings: [],
  patterns: {
    repetitive: false,
    formal: false,
    structured: false,
    statistical: false,
    aiPhrases: false
  },
  confidence: 0,
  metrics: {
    wordVariety: 0,
    avgSentenceLength: 0,
    patternDensity: 0,
    complexityScore: 0,
    repetitivePatterns: 0
  }
});

export const analyzeText = (text: string): AnalysisResult => {
  if (!text.trim()) {
    return getEmptyResult();
  }

  let totalScore = 0;
  let findings: string[] = [];

  // Split text for analysis
  const words = text.trim().split(/\s+/);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const uniqueWords = new Set(words);

  // 1. Calculate Pattern Scores
  const patternScores = calculatePatternScores(text);
  totalScore += patternScores.score;
  findings.push(...patternScores.findings);

  // 2. Check Content Structure
  const structuralScore = analyzeContentStructure(text);
  totalScore += structuralScore.score;
  findings.push(...structuralScore.findings);

  // 3. Advanced Language Analysis
  const languageScore = analyzeLanguagePatterns(text);
  totalScore += languageScore.score;
  findings.push(...languageScore.findings);

  // Calculate metrics
  const metrics = {
    wordVariety: uniqueWords.size / words.length,
    avgSentenceLength: words.length / sentences.length,
    patternDensity: patternScores.score,
    complexityScore: structuralScore.score,
    repetitivePatterns: patternScores.hasRepetitivePatterns ? 1 : 0
  };

  // Final score normalization and confidence calculation
  const finalScore = normalizeScore(totalScore);
  const confidence = calculateConfidence(text, finalScore);

  return {
    score: finalScore,
    findings: [...new Set(findings)],
    patterns: {
      repetitive: patternScores.hasRepetitivePatterns,
      formal: languageScore.isFormal,
      structured: structuralScore.isStructured,
      statistical: hasStatisticalPatterns(text),
      aiPhrases: patternScores.hasAIPhrases
    },
    confidence,
    metrics
  };
};

const calculatePatternScores = (text: string): PatternScore => {
  let score = 0;
  const findings: string[] = [];
  let hasAIPhrases = false;
  let hasRepetitivePatterns = false;

  // Check for common AI writing patterns
  const aiPatterns = [
    /\b(is|are|was|were) (a|an|the) (way|method|approach|technique|process|system|mechanism)\b/gi,
    /\b(plays|serves|acts as|functions as) (a|an) (important|crucial|critical|essential|significant) (role|part|function)\b/gi,
    /\b(enables|allows|facilitates|helps|aids in|assists with|promotes|supports)\b/gi,
    /\b(has|have|had) been (used|implemented|developed|created|designed|established)\b/gi,
    /\b(various|different|multiple|numerous|several|many) (types|kinds|forms|aspects|components|elements|factors)\b/gi,
    /\b(in order to|for the purpose of|with the aim of|designed to|intended to)\b/gi,
    /\b(however|moreover|furthermore|additionally|consequently|therefore|thus|hence)\b/gi,
    /\b(it is important to note that|it should be noted that|it is worth mentioning that)\b/gi,
    /\b(has the potential to|is capable of|is able to|can be used to|may be utilized to)\b/gi,
    /\b(due to|because of|as a result of|owing to|on account of)\b/gi
  ];

  aiPatterns.forEach(pattern => {
    const matches = (text.match(pattern) || []).length;
    if (matches > 0) {
      score += matches * 0.15;
      hasAIPhrases = true;
    }
  });

  // Check for repetitive sentence structures
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const sentenceStarts = sentences.map(s => s.trim().split(/\s+/).slice(0, 3).join(' ').toLowerCase());
  const uniqueStarts = new Set(sentenceStarts);
  
  if (uniqueStarts.size / sentences.length < 0.7) {
    score += 0.3;
    hasRepetitivePatterns = true;
    findings.push('Repetitive sentence structure detected');
  }

  // Check for formal academic phrases
  const academicPhrases = [
    'this suggests that',
    'research indicates',
    'studies show',
    'evidence suggests',
    'it can be concluded',
    'analysis reveals',
    'results demonstrate',
    'findings indicate',
    'data shows',
    'literature suggests'
  ];

  const academicMatches = academicPhrases.filter(phrase => 
    text.toLowerCase().includes(phrase)
  ).length;

  if (academicMatches > 0) {
    score += academicMatches * 0.2;
    findings.push('Academic writing patterns detected');
  }

  return { score, findings, hasAIPhrases, hasRepetitivePatterns };
};

const analyzeContentStructure = (text: string): StructuralAnalysis => {
  let score = 0;
  const findings: string[] = [];
  
  // Split into paragraphs
  const paragraphs = text.split('\n\n').filter(Boolean);
  
  // Check for typical AI paragraph structure
  if (paragraphs.length >= 2) {
    // Introduction pattern
    if (/^(this|there|it|[A-Z][a-z]+) (is|has been|refers to|encompasses|involves) [^.!?]+\./.test(paragraphs[0])) {
      score += 0.2;
      findings.push('Typical AI introduction pattern');
    }

    // Transition patterns between paragraphs
    let transitionCount = 0;
    for (let i = 1; i < paragraphs.length; i++) {
      if (/^(however|moreover|furthermore|additionally|in addition|another|similarly)[^.!?]+\./.test(paragraphs[i])) {
        transitionCount++;
      }
    }
    
    if (transitionCount > 0) {
      score += transitionCount * 0.15;
      findings.push('AI-typical paragraph transitions');
    }

    // Conclusion pattern
    const lastParagraph = paragraphs[paragraphs.length - 1];
    if (/(in conclusion|to summarize|overall|ultimately|in summary|thus|therefore)[^.!?]+\./.test(lastParagraph)) {
      score += 0.2;
      findings.push('Typical AI conclusion pattern');
    }
  }

  return { 
    score, 
    findings, 
    isStructured: score > 0.3 
  };
};

const analyzeLanguagePatterns = (text: string): LanguageAnalysis => {
  let score = 0;
  const findings: string[] = [];
  
  // Check for passive voice
  const passiveVoice = text.match(/\b(is|are|was|were|been|be) \w+ed\b/g) || [];
  if (passiveVoice.length > 2) {
    score += Math.min(passiveVoice.length * 0.1, 0.3);
    findings.push('Frequent passive voice usage');
  }

  // Check for complex coordinating conjunctions
  const complexConjunctions = text.match(/\b(not only|but also|neither|nor|either|or|both|and)\b/g) || [];
  if (complexConjunctions.length > 2) {
    score += 0.2;
    findings.push('Complex conjunction patterns');
  }

  // Check for impersonal tone
  const impersonalConstructs = [
    'it is',
    'there are',
    'this shows',
    'these results',
    'the analysis',
    'the findings',
    'the evidence',
    'the research',
    'the study',
    'the system'
  ];

  const impersonalCount = impersonalConstructs.filter(construct => 
    text.toLowerCase().includes(construct)
  ).length;

  if (impersonalCount > 3) {
    score += 0.25;
    findings.push('Impersonal academic tone');
  }

  return {
    score,
    findings,
    isFormal: score > 0.3
  };
};

const hasStatisticalPatterns = (text: string): boolean => {
  const statisticalPatterns = [
    // Percentages and numbers
    /\b\d{1,3}(?:\.\d{1,2})?%/,
    /\d+\s*percent\b/,
    /\b\d+\s*out of\s*\d+\b/,
    
    // Quantifiers
    /\b(majority|minority|significant portion|substantial number)\b/,
    /\b(approximately|roughly|about|around|nearly|almost)\s*\d+\b/,
    
    // Growth/Decline patterns
    /\b(increased|decreased|grew|declined|reduced)\s*by\s*\d+\b/,
    /\b\d+\s*times\s*(more|less|greater|higher|lower)\b/,
    
    // Statistical terms
    /\b(average|mean|median|mode|rate|percentage|proportion|ratio)\b/,
    /\b(survey|study|analysis|research|data|statistics|findings)\s*shows?\b/,
    /\b(according to|based on)\s*(research|studies|data|statistics|analysis)\b/
  ];

  return statisticalPatterns.some(pattern => pattern.test(text));
};

const normalizeScore = (score: number): number => {
  return Math.min(score * 1.5, 1);
};

const calculateConfidence = (text: string, score: number): number => {
  const textLength = text.length;
  let confidence = score;

  if (textLength > 500) {
    confidence *= 1.2; // Increase confidence for longer texts
  }

  return Math.min(confidence, 1);
};