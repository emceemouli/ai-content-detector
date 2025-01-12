export const normalizeText = (text: string): string => {
  return text.toLowerCase().trim();
};

export const calculateWordDensity = (count: number, totalWords: number): number => {
  return totalWords > 0 ? count / totalWords : 0;
};

export const calculateSentenceComplexity = (sentence: string): number => {
  const words = sentence.split(/\s+/);
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  const hasComplexStructures = /\b(although|however|nevertheless|notwithstanding)\b/i.test(sentence);
  
  return (avgWordLength * 0.5) + (hasComplexStructures ? 0.5 : 0);
};

export const extractSentences = (text: string): string[] => {
  return text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
};

export const calculateWordVariety = (text: string): number => {
  const words = text.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  return uniqueWords.size / words.length;
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const isComplexWord = (word: string): boolean => {
  const syllables = countSyllables(word);
  return syllables > 2;
};

export const countSyllables = (word: string): number => {
  word = word.toLowerCase();
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
};