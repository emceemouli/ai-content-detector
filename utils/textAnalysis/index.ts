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
  confidence: 0
});

// Enhanced scoring system with better accuracy
export const analyzeText = (text: string): AnalysisResult => {
  if (!text.trim()) {
    return getEmptyResult();
  }

  let totalScore = 0;
  let findings: string[] = [];

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
    confidence
  };
};

const calculatePatternScores = (text: string): PatternScore => {
  let score = 0;
  const findings: string[] = [];
  let hasAIPhrases = false;
  let hasRepetitivePatterns = false;

  // Rest of your existing calculatePatternScores function...
  return { score, findings, hasAIPhrases, hasRepetitivePatterns };
};

const analyzeContentStructure = (text: string): StructuralAnalysis => {
  let score = 0;
  const findings: string[] = [];
  
  // Rest of your existing analyzeContentStructure function...
  return { score, findings, isStructured: score > 0.3 };
};

const analyzeLanguagePatterns = (text: string): LanguageAnalysis => {
  let score = 0;
  const findings: string[] = [];
  
  // Rest of your existing analyzeLanguagePatterns function...
  return { score, findings, isFormal: score > 0.3 };
};

const normalizeScore = (score: number): number => {
  return Math.min(score * 1.5, 1);
};

const hasStatisticalPatterns = (text: string): boolean => {
  // Your existing hasStatisticalPatterns function...
  return statisticalPatterns.some(pattern => pattern.test(text));
};

const calculateConfidence = (text: string, score: number): number => {
  const textLength = text.length;
  let confidence = score;

  if (textLength > 500) {
    confidence *= 1.2;
  }

  return Math.min(confidence, 1);
};