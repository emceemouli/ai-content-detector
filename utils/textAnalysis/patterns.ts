import { PatternType, PatternCategory } from './types';

export const basePatterns: Record<PatternType, PatternCategory> = {
  transitions: {
    name: 'transitions',
    patterns: new Set([
      // Common AI transitions
      'however',
      'furthermore',
      'in addition',
      'moreover',
      'additionally',
      'despite these',
      'nevertheless',
      'consequently',
      'therefore',
      'thus',
      'hence',
      'as a result',
      'subsequently',
      'in contrast',
      'on the other hand',
      'in particular',
      'specifically',
      'notably',
      'primarily',
      'essentially'
    ]),
    weight: 0.3,
    threshold: 0.05,
    finding: 'Typical AI transition patterns detected'
  },

  explanatory: {
    name: 'explanatory',
    patterns: new Set([
      // Explanatory phrases
      'is a',
      'refers to',
      'enables',
      'allows',
      'involves',
      'such as',
      'including',
      'for example',
      'aims to',
      'designed to',
      'in order to',
      'serves to',
      'functions as',
      'acts as',
      'works by',
      'operates through',
      'facilitates',
      'contributes to',
      'leads to',
      'results in'
    ]),
    weight: 0.3,
    threshold: 0.05,
    finding: 'Explanatory patterns typical of AI'
  },

  formal: {
    name: 'formal',
    patterns: new Set([
      // Formal academic phrases
      'it is important to note',
      'this suggests that',
      'research indicates',
      'studies show',
      'evidence suggests',
      'can be attributed to',
      'is considered to be',
      'plays a crucial role',
      'significant impact',
      'fundamental aspect',
      'essential component',
      'primary function',
      'key factor',
      'critical element',
      'notable example',
      'substantial evidence',
      'considerable attention',
      'extensive research',
      'numerous studies',
      'various applications'
    ]),
    weight: 0.35,
    threshold: 0.05,
    finding: 'Formal academic language patterns detected'
  },

  structural: {
    name: 'structural',
    patterns: new Set([
      // Common AI structural patterns
      'one of the',
      'there are',
      'it is',
      'this is',
      'these are',
      'can be',
      'has been',
      'will be',
      'need to be',
      'must be',
      'should be',
      'could be',
      'would be',
      'may be',
      'might be',
      'due to the',
      'according to',
      'based on the',
      'with respect to',
      'in terms of'
    ]),
    weight: 0.25,
    threshold: 0.05,
    finding: 'AI structural patterns detected'
  },

  descriptive: {
    name: 'descriptive',
    patterns: new Set([
      // Descriptive patterns
      'wide range of',
      'various types of',
      'different kinds of',
      'number of',
      'variety of',
      'aspects of',
      'elements of',
      'benefits of',
      'impact of',
      'role of',
      'importance of',
      'significance of',
      'nature of',
      'quality of',
      'degree of',
      'level of',
      'scope of',
      'range of',
      'series of',
      'set of'
    ]),
    weight: 0.25,
    threshold: 0.05,
    finding: 'AI descriptive patterns found'
  }
};

export const sentenceStarters = new Set([
  'In',
  'By',
  'Through',
  'With',
  'As',
  'This',
  'These',
  'The',
  'One',
  'Many',
  'Such',
  'While',
  'Although',
  'Despite',
  'Given',
  'Since',
  'When',
  'Furthermore',
  'Moreover',
  'Additionally'
]);

export const paragraphPatterns = {
  introduction: /^(this|there|it|[A-Z][a-z]+) (is|has been|refers to|encompasses|involves|represents|provides|offers|serves as) [^.!?]+\./i,
  body: /(furthermore|moreover|additionally|in addition|another|similarly|likewise|in contrast|however|nevertheless)[^.!?]+\./i,
  conclusion: /(in conclusion|to summarize|overall|ultimately|in summary|thus|therefore|in essence|finally|lastly)[^.!?]+\.$/i,
  transition: /^(however|moreover|furthermore|additionally|in addition|similarly|likewise|in contrast)[^.!?]+\./i
};

export const complexityIndicators = {
  subordinateConjunctions: new Set([
    'although',
    'though',
    'even though',
    'because',
    'since',
    'unless',
    'while',
    'whereas',
    'wherever',
    'whether'
  ]),
  complexTransitions: new Set([
    'in terms of',
    'with respect to',
    'in relation to',
    'with regard to',
    'in the context of',
    'in consideration of',
    'in light of',
    'as evidenced by',
    'as demonstrated by'
  ])
};

export const learningThresholds = {
  minFrequency: 5,
  minConfidence: 0.85,
  patternLength: {
    min: 2,
    max: 4
  },
  densityThreshold: 0.1,
  repetitionThreshold: 0.3
};

export const weightAdjustments = {
  patternMatch: 0.4,
  sentenceComplexity: 0.3,
  wordVariety: 0.3,
  formalityBoost: 0.2,
  statisticalBoost: 0.15
};