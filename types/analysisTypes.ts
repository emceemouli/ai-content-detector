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

export type PatternMatchType = 'transitions' | 'formal' | 'academic';
export type PatternMatches = Record<PatternMatchType, number>;