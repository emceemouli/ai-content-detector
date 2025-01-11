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
  // Initialize variables
  let score = 0;
  let findings: string[] = [];

  // Define patterns
  const patterns = {
    transitionPhrases: /\b(furthermore|moreover|additionally|consequently|thus|hence|therefore|in addition|as a result|subsequently)\b/gi,
    formalLanguage: /\b(utilize|implementation|facilitate|regarding|numerous|optimal|demonstrate|indicate|significant|fundamental)\b/gi,
    statisticalClaims: /\b(\d{1,3}(?:\.\d{1,2})?%|percent|proportion|majority|minority)\b/gi,
    repetitiveStructures: /(it is|there is|this is|these are) (important|crucial|essential|significant|necessary)/gi,
  };

  // Calculate matches
  const matches = {
    transitions: (text.match(patterns.transitionPhrases) || []).length,
    formal: (text.match(patterns.formalLanguage) || []).length,
    statistical: (text.match(patterns.statisticalClaims) || []).length,
    repetitive: (text.match(patterns.repetitiveStructures) || []).length
  };

  // Score transitions
  if (matches.transitions >= 2) {
    score += 0.25;
    findings.push('High frequency of transitional phrases typical of AI writing');
  }

  // Score formal language
  if (matches.formal >= 2) {
    score += 0.2;
    findings.push('Significant use of formal/academic language');
  }

  // Score statistical claims
  if (matches.statistical > 0) {
    score += 0.2;
    findings.push('Contains statistical claims or measurements');
  }

  // Score repetitive structures
  if (matches.repetitive >= 2) {
    score += 0.2;
    findings.push('Repetitive sentence structures detected');
  }

  // Analyze sentence structure
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const avgLength = sentences.length > 0
    ? sentences.reduce((acc, sent) => acc + sent.trim().split(/\s+/).length, 0) / sentences.length
    : 0;

  if (avgLength > 20) {
    score += 0.15;
    findings.push('Consistently long, complex sentences');
  }

  // Return the analysis result
  return {
    score: Math.min(score, 1), // Ensure score doesn't exceed 1
    findings,
    patterns: {
      repetitive: matches.repetitive >= 2,
      formal: matches.formal >= 2,
      structured: avgLength > 20,
      statistical: matches.statistical > 0,
      aiPhrases: (matches.transitions + matches.formal) > 3
    }
  };
};