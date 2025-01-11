// utils/textAnalysis.ts

// Define the interface first
export interface AnalysisResult {
  score: number;
  findings: string[];
  patterns: {
    repetitive: boolean;
    formal: boolean;
    structured: boolean;
    statistical: boolean;
    aiPhrases?: boolean;
  };
}

// Then export the function
export const analyzeText = (text: string): AnalysisResult => {
  // Normalize text for better analysis
  const normalizedText = text.toLowerCase();
  
  // Enhanced patterns with more AI indicators
  const patterns = {
    transitionPhrases: /\b(furthermore|moreover|additionally|consequently|thus|hence|therefore|in addition|as a result|subsequently|in particular|specifically|notably|indeed|ultimately)\b/gi,
    formalLanguage: /\b(utilize|implementation|facilitate|regarding|numerous|optimal|demonstrate|indicate|significant|fundamental|extensively|substantially|primarily|effectively|systematically)\b/gi,
    statisticalClaims: /\b(\d{1,3}(?:\.\d{1,2})?%|percent|proportion|majority|minority|significant number|substantial|considerable|numerous|various)\b/gi,
    repetitiveStructures: /(it is|there is|this is|these are) (important|crucial|essential|significant|necessary|evident|clear|notable|worth noting|noteworthy)/gi,
    conclusionPhrases: /\b(in conclusion|to summarize|it can be concluded|as discussed|as shown above|as demonstrated|in summary|based on the above|as evidenced by|in light of these|considering the aforementioned)\b/gi,
    formulaicPhrases: /\b(it must be noted that|it should be noted that|it is worth noting that|it is important to note that|studies indicate that|research suggests that|evidence demonstrates that|analysis reveals that|data indicates that)\b/gi,
    impersonalConstructions: /\b(it is|there are|this has been|these have been) (demonstrated|shown|proven|indicated|suggested|noted|observed|found|established|determined|verified|confirmed)/gi
  };

  let score = 0;
  let findings: string[] = [];

  // Calculate matches for each pattern
  const matches = {
    transitions: (text.match(patterns.transitionPhrases) || []).length,
    formal: (text.match(patterns.formalLanguage) |