export const analyzeText = (text: string): AnalysisResult => {
  // Normalize text for better analysis
  const normalizedText = text.toLowerCase();
  
  // Enhanced patterns with more AI indicators
  const patterns = {
    // Transition phrases (increased weight)
    transitionPhrases: /\b(furthermore|moreover|additionally|consequently|thus|hence|therefore|in addition|as a result|subsequently|in particular|specifically|notably|indeed|ultimately)\b/gi,
    
    // AI-specific formal language
    formalLanguage: /\b(utilize|implementation|facilitate|regarding|numerous|optimal|demonstrate|indicate|significant|fundamental|extensively|substantially|primarily|effectively|systematically)\b/gi,
    
    // Statistical and data references
    statisticalClaims: /\b(\d{1,3}(?:\.\d{1,2})?%|percent|proportion|majority|minority|significant number|substantial|considerable|numerous|various)\b/gi,
    
    // AI structural patterns
    repetitiveStructures: /(it is|there is|this is|these are) (important|crucial|essential|significant|necessary|evident|clear|notable|worth noting|noteworthy)/gi,
    
    // Expanded conclusion phrases
    conclusionPhrases: /\b(in conclusion|to summarize|it can be concluded|as discussed|as shown above|as demonstrated|in summary|based on the above|as evidenced by|in light of these|considering the aforementioned)\b/gi,
    
    // Common AI expressions
    formulaicPhrases: /\b(it must be noted that|it should be noted that|it is worth noting that|it is important to note that|studies indicate that|research suggests that|evidence demonstrates that|analysis reveals that|data indicates that)\b/gi,
    
    // Impersonal academic style
    impersonalConstructions: /\b(it is|there are|this has been|these have been) (demonstrated|shown|proven|indicated|suggested|noted|observed|found|established|determined|verified|confirmed)/gi
  };

  let score = 0;
  let findings: string[] = [];

  // Enhanced scoring with adjusted weights
  const matches = {
    transitions: (text.match(patterns.transitionPhrases) || []).length,
    formal: (text.match(patterns.formalLanguage) || []).length,
    statistical: (text.match(patterns.statisticalClaims) || []).length,
    repetitive: (text.match(patterns.repetitiveStructures) || []).length,
    conclusions: (text.match(patterns.conclusionPhrases) || []).length,
    formulaic: (text.match(patterns.formulaicPhrases) || []).length,
    impersonal: (text.match(patterns.impersonalConstructions) || []).length
  };

  // Adjusted scoring weights
  if (matches.transitions >= 2) {
    score += 0.25; // Increased from 0.2
    findings.push('High frequency of transitional phrases typical of AI writing');
  }

  if (matches.formal >= 2) {
    score += 0.2; // Increased from 0.15
    findings.push('Significant use of formal/academic language');
  }

  if (matches.statistical > 0) {
    score += 0.2; // Increased from 0.15
    findings.push('Contains statistical claims or measurements');
  }

  if (matches.repetitive >= 2) {
    score += 0.25; // Increased from 0.2
    findings.push('Repetitive sentence structures detected');
  }

  if (matches.conclusions > 0) {
    score += 0.2; // Increased from 0.15
    findings.push('Uses typical AI concluding phrases');
  }

  if (matches.formulaic > 0) {
    score += 0.3; // Increased from 0.25
    findings.push('Contains formulaic expressions common in AI text');
  }

  // New density calculation
  const wordCount = text.split(/\s+/).length;
  const patternDensity = (matches.transitions + matches.formal + matches.formulaic) / wordCount;
  
  if (patternDensity > 0.15) {
    score += 0.2;
    findings.push('High density of AI-like patterns detected');
  }

  // Analyze sentence structure with adjusted threshold
  const sentences = text.split(/[.!?]+/);
  const avgLength = sentences.reduce((acc, sent) => 
    acc + sent.trim().split(/\s+/).length, 0) / sentences.length;
  
  if (avgLength > 15) { // Lowered from 20
    score += 0.2;
    findings.push('Consistently complex sentence structures');
  }

  return {
    score: Math.min(score, 1),
    findings,
    patterns: {
      repetitive: matches.repetitive >= 2,
      formal: matches.formal >= 2,
      structured: avgLength > 15,
      statistical: matches.statistical > 0,
      aiPhrases: (matches.transitions + matches.conclusions + matches.formulaic) > 2
    }
  };
};