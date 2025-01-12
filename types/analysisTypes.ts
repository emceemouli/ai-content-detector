// File 1: types/analysisTypes.ts
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

// File 2: utils/textAnalysis.ts
import { AnalysisResult, PatternMatchType, PatternMatches } from '../types/analysisTypes';

export const analyzeText = (text: string): AnalysisResult => {
  // Normalize text
  const normalizedText = text.toLowerCase();
  const words = normalizedText.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const uniqueWords = new Set(words);

  let score = 0;
  let findings: string[] = [];
  let confidence = 0;

  // Pattern detection with enhanced patterns
  const patterns = {
    transitions: {
      patterns: [
        'furthermore', 'moreover', 'additionally', 'consequently', 'thus',
        'hence', 'therefore', 'in addition', 'as a result', 'subsequently',
        'accordingly', 'similarly', 'in contrast', 'however', 'nevertheless'
      ],
      weight: 0.25
    },
    formal: {
      patterns: [
        'utilize', 'implementation', 'facilitate', 'regarding', 'numerous',
        'optimal', 'demonstrate', 'indicate', 'significant', 'fundamental',
        'methodology', 'paradigm', 'conceptualize', 'emphasize'
      ],
      weight: 0.2
    },
    academic: {
      patterns: [
        'it must be noted that', 'it should be noted that', 'it is worth noting that',
        'studies indicate that', 'research suggests that', 'evidence demonstrates that',
        'analysis reveals that', 'data indicates that', 'findings suggest that'
      ],
      weight: 0.3
    }
  };

  // Initialize pattern matches with typed structure
  const patternMatches: PatternMatches = {
    transitions: 0,
    formal: 0,
    academic: 0
  };

  // Count pattern occurrences with type safety
  Object.entries(patterns).forEach(([type, { patterns: patternList, weight }]) => {
    patternList.forEach(pattern => {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      const matches = (text.match(regex) || []).length;
      if (matches > 0) {
        score += matches * weight;
        patternMatches[type as PatternMatchType] += matches;
      }
    });
  });

  // Calculate metrics
  const metrics = {
    wordVariety: uniqueWords.size / words.length,
    avgSentenceLength: words.length / sentences.length,
    patternDensity: (patternMatches.transitions + patternMatches.formal + patternMatches.academic) / words.length,
    complexityScore: calculateComplexity(text, sentences),
    repetitivePatterns: calculateRepetitivePatterns(sentences)
  };

  // Generate findings based on metrics
  if (metrics.wordVariety < 0.4) {
    findings.push('Limited vocabulary variety detected');
    score += 0.15;
  }

  if (metrics.avgSentenceLength > 20) {
    findings.push('Consistently complex sentence structures');
    score += 0.15;
  }

  if (metrics.patternDensity > 0.1) {
    findings.push('High density of AI-typical patterns detected');
    score += 0.2;
  }

  // Calculate confidence based on multiple factors
  confidence = calculateConfidence(metrics, findings.length);

  return {
    score: Math.min(score, 1),
    findings,
    patterns: {
      repetitive: metrics.repetitivePatterns > 0.3,
      formal: patternMatches.formal > 2,
      structured: metrics.avgSentenceLength > 20,
      statistical: hasStatisticalPatterns(text),
      aiPhrases: patternMatches.academic > 2
    },
    confidence,
    metrics
  };
};

const calculateComplexity = (text: string, sentences: string[]): number => {
  const complexWords = text.split(/\s+/).filter(word => 
    word.length > 6 || /(?:[^laeiouy]es|ed|[^laeiouy]e)$/.test(word)
  ).length;

  const complexSentences = sentences.filter(sent => 
    sent.split(/\s+/).length > 20 || 
    /\b(although|however|nevertheless|furthermore|additionally)\b/i.test(sent)
  ).length;

  return (complexWords / text.split(/\s+/).length + complexSentences / sentences.length) / 2;
};

const calculateRepetitivePatterns = (sentences: string[]): number => {
  const patterns = sentences.map(s => s.split(' ')[0].toLowerCase());
  const repetitions = patterns.filter((p, i) => patterns.indexOf(p) !== i).length;
  return repetitions / sentences.length;
};

const hasStatisticalPatterns = (text: string): boolean => {
  const patterns = [
    /\d{1,3}(?:\.\d{1,2})?%/,
    /\d+\s*percent/,
    /majority|minority|significant portion|substantial number/,
    /\d+\s*times/,
    /increased by|\d+\s*fold/
  ];

  return patterns.some(pattern => pattern.test(text));
};

const calculateConfidence = (metrics: any, findingsCount: number): number => {
  let confidence = 0;
  
  // Weight different factors
  confidence += metrics.wordVariety < 0.4 ? 0.2 : 0;
  confidence += metrics.patternDensity > 0.1 ? 0.3 : 0;
  confidence += findingsCount / 10;

  return Math.min(confidence + 0.3, 1); // Base confidence of 0.3
};

// File 3: components/TextAnalyzer.tsx
import React, { useState } from 'react';
import { CheckCircle2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { analyzeText } from '../utils/textAnalysis';
import { AnalysisResult } from '../types/analysisTypes';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);

  const handleAnalysis = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const analysisResult = analyzeText(text);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderRadarChart = (metrics: AnalysisResult['metrics']) => {
    const data = [
      {
        subject: 'Word Variety',
        value: metrics.wordVariety * 100,
        fullMark: 100,
      },
      {
        subject: 'Complexity',
        value: metrics.complexityScore * 100,
        fullMark: 100,
      },
      {
        subject: 'Pattern Usage',
        value: metrics.patternDensity * 100,
        fullMark: 100,
      },
      {
        subject: 'Sentence Length',
        value: Math.min(metrics.avgSentenceLength * 5, 100),
        fullMark: 100,
      },
      {
        subject: 'Repetition',
        value: metrics.repetitivePatterns * 100,
        fullMark: 100,
      },
    ];

    return (
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              name="Metrics"
              dataKey="value"
              stroke="#9333EA"
              fill="#9333EA"
              fillOpacity={0.5}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderDistributionChart = (result: AnalysisResult) => {
    const data = [
      {
        name: 'AI Patterns',
        value: result.score * 100,
      },
      {
        name: 'Formality',
        value: result.metrics.patternDensity * 100,
      },
      {
        name: 'Complexity',
        value: result.metrics.complexityScore * 100,
      },
      {
        name: 'Word Variety',
        value: result.metrics.wordVariety * 100,
      },
    ];

    return (
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#9333EA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <textarea
          className="w-full h-64 p-4 border-2 border-purple-200 rounded-lg 
                   focus:ring-2 focus:ring-purple-500 focus:border-transparent
                   resize-none"
          placeholder="Paste your text here (up to 3000 words)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAnalysis}
            disabled={isAnalyzing || !text.trim()}
            className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white rounded-lg transition-all flex items-center gap-2
                     ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Analyze Text
              </>
            )}
          </button>

          <span className="text-sm text-gray-500">
            {text.trim().split(/\s+/).length}/3000 words
          </span>
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 space-y-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-purple-600">
                  {Math.round(result.score * 100)}% AI Probability
                </h3>
                <p className="text-gray-600 mt-1">
                  Confidence: {Math.round(result.confidence * 100)}%
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Analysis Strength</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-8 rounded-full ${
                        i < Math.ceil(result.confidence * 5)
                          ? 'bg-purple-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                style={{ width: `${result.score * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border">
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className="w-full p-4 flex justify-between items-center text-lg font-semibold"
            >
              Analysis Details
              {showMetrics ? <ChevronUp /> : <ChevronDown />}
            </button>

            {showMetrics && (
              <div className="p-6 border-t">
                <div className="space-y-8">
                  {renderRadarChart(result.metrics)}
                  {renderDistributionChart(result)}
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <MetricCard
                      title="Word Variety"
                      value={`${(result.metrics.wordVariety * 100).toFixed(1)}%`}
                      info="Higher variety suggests more natural writing"
                    />
                    <MetricCard
                      title="Pattern Density"
                      value={`${(result.metrics.patternDensity * 100).toFixed(1)}%`}
                      info="Density of AI-typical patterns"
                    />
                    <MetricCard
                      title="Complexity"
                      value={`${(result.metrics.complexityScore * 100).toFixed(1)}%`}
                      info="Overall text complexity score"
                    />
                    <MetricCard
                      title="Avg Sentence Length"
                      value={`${result.metrics.avgSentenceLength.toFixed(1)}`}
                      info="Average words per sentence"
                    />
                    <MetricCard
                      title="Repetitive Patterns"
                      value={`${(result.metrics.repetitivePatterns * 100).toFixed(1)}%`}
                      info="Percentage of repeated patterns"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  info: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, info }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex justify-between items-start">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-semibold text-gray-900 mt-1">{value}</div>
      </div>
      <div className="group relative" title={info}>
        <Info className="h-4 w-4 text-gray-400" />
        <div className="invisible group-hover:visible absolute right-0 top-6 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
          {info}
        </div>
      </div>
    </div>
  </div>
);

export default TextAnalyzer;