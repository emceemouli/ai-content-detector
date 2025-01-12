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
}

export interface PatternCategory {
  patterns: Set<string>;
  weight: number;
  threshold: number;
  finding: string;
}

export interface PatternMatch {
  count: number;
  density: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}