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
  metrics: AnalysisMetrics;
}

export interface AnalysisMetrics {
  wordVariety: number;
  avgSentenceLength: number;
  patternDensity: number;
  complexityScore: number;
  uniquePatterns: number;
}

export interface PatternCategory {
  name: string;
  patterns: Set<string>;
  weight: number;
  threshold: number;
  finding: string;
}

export interface PatternMatch {
  count: number;
  density: number;
  patterns: string[];
}

export interface LearningData {
  pattern: string;
  frequency: number;
  confidence: number;
  lastSeen: Date;
}

export type PatternType = 'transitions' | 'formalLanguage' | 'aiPhrases' | 'statistical';