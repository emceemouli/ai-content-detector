export interface AnalysisResult {
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

export interface PatternScore {
  score: number;
  findings: string[];
  hasAIPhrases: boolean;
  hasRepetitivePatterns: boolean;
}

export interface StructuralAnalysis {
  score: number;
  findings: string[];
  isStructured: boolean;
}

export interface LanguageAnalysis {
  score: number;
  findings: string[];
  isFormal: boolean;
}