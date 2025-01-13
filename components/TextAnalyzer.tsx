import React, { useState } from 'react';
import { CheckCircle2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { analyzeText } from '@/utils/textAnalysis';
import { AnalysisResult } from '@/types/analysisTypes';
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

const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);

  const handleAnalysis = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                  {result.findings.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">Key Findings</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {result.findings.map((finding, index) => (
                          <li key={index} className="text-gray-700">{finding}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAnalyzer;