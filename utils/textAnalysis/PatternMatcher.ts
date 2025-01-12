import type { PatternCategory, PatternMatch } from '../../types';
import patterns from '../../data/aiPatterns.json';

export class PatternMatcher {
  private static instance: PatternMatcher;
  private patterns: Map<string, PatternCategory>;
  private learningThreshold: number = 0.85;
  private patternHistory: Map<string, number> = new Map();

  private constructor() {
    this.patterns = new Map();
    this.initializePatterns();
  }

  static getInstance(): PatternMatcher {
    if (!PatternMatcher.instance) {
      PatternMatcher.instance = new PatternMatcher();
    }
    return PatternMatcher.instance;
  }

  private initializePatterns(): void {
    Object.entries(patterns).forEach(([category, data]) => {
      this.patterns.set(category, {
        patterns: new Set(data.patterns),
        weight: data.weight,
        threshold: data.threshold,
        finding: data.finding
      });
    });
  }
  private detectTopicPatterns(text: string): number {
  const educationalPatterns = [
    /\b\w+ is a \w+ that\b/,
    /\bone of the (main|key|core|primary)\b/,
    /\bis (being )?used (in|to)\b/,
    /\bcan help us\b/,
    /\bit is important to\b/
  ];

  let score = 0;
  educationalPatterns.forEach(pattern => {
    if (pattern.test(text)) {
      score += 0.15;
    }
  });
  return score;
}

  matchPatterns(text: string): Map<string, PatternMatch> {
    const matches = new Map<string, PatternMatch>();
    const words = text.split(/\s+/).length;

    this.patterns.forEach((category, name) => {
      let count = 0;
      category.patterns.forEach(pattern => {
        const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
        const matchCount = (text.match(regex) || []).length;
        count += matchCount;
        
        if (matchCount > 0) {
          this.updatePatternHistory(pattern, matchCount);
        }
      });

      matches.set(name, {
        count,
        density: count / words
      });
    });

    return matches;
  }

  private updatePatternHistory(pattern: string, count: number): void {
    const currentCount = this.patternHistory.get(pattern) || 0;
    this.patternHistory.set(pattern, currentCount + count);
  }

  getCategory(name: string): PatternCategory | undefined {
    return this.patterns.get(name);
  }

  getAllCategories(): Map<string, PatternCategory> {
    return this.patterns;
  }

  // Dynamic pattern learning
  learnNewPatterns(text: string, isConfirmedAI: boolean, confidence: number): void {
    if (confidence > this.learningThreshold) {
      const phrases = this.extractPotentialPatterns(text);
      phrases.forEach(phrase => {
        if (this.isValidNewPattern(phrase)) {
          this.addNewPattern(phrase);
        }
      });
    }
  }
  
  private analyzeSentenceStructure(text: string): number {
  const sentences = text.split(/[.!?]+/);
  let score = 0;

  // Check for parallel structure
  const parallelStructures = sentences.filter(s => 
    /^In \w+,/.test(s) || 
    /^By \w+,/.test(s) ||
    /^This \w+/.test(s)
  ).length;

  if (parallelStructures >= 2) {
    score += 0.2;
  }

  // Check for complex explanatory structures
  const explanatory = sentences.filter(s =>
    /\w+ refers to\b/.test(s) ||
    /\w+ involves\b/.test(s) ||
    /\w+ enables\b/.test(s) ||
    /\w+ allows\b/.test(s)
  ).length;

  if (explanatory >= 2) {
    score += 0.2;
  }

  return score;
}

  private extractPotentialPatterns(text: string): string[] {
    // Extract 2-4 word phrases
    const words = text.toLowerCase().split(/\s+/);
    const phrases = new Set<string>();

    for (let i = 0; i < words.length - 1; i++) {
      for (let j = 2; j <= 4 && i + j <= words.length; j++) {
        phrases.add(words.slice(i, i + j).join(' '));
      }
    }

    return Array.from(phrases);
  }

  private isValidNewPattern(phrase: string): boolean {
    // Check if phrase appears frequently in confirmed AI text
    const frequency = this.patternHistory.get(phrase) || 0;
    return frequency >= 5; // Threshold for adding new patterns
  }

  private addNewPattern(phrase: string): void {
    // Add to most appropriate category based on phrase characteristics
    if (phrase.match(/^(it|this|there) (is|are|was|were)/)) {
      this.patterns.get('aiPhrases')?.patterns.add(phrase);
    } else if (phrase.match(/^(furthermore|moreover|consequently)/)) {
      this.patterns.get('transitions')?.patterns.add(phrase);
    }
  }
}