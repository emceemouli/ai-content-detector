import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { analyzeText } from '../utils/textAnalysis';

interface AnalysisResult {
  score: number;
  findings: string[];
  patterns: {
    repetitive: boolean;
    formal: boolean;
    structured: boolean;
    statistical: boolean;
  };
}

export default function TextAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
	      <Head> 
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638771792216412"
          crossorigin="anonymous"></script>
      </Head>
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

      {/* Results Display */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* AI Score Section */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">AI Probability</span>
                <span className="font-semibold text-purple-600">
                  {Math.round(result.score * 100)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                  style={{ width: `${result.score * 100}%` }}
                />
              </div>
            </div>

            {/* Findings Section */}
            {result.findings.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-3">Key Findings:</h4>
                <ul className="space-y-2">
                  {result.findings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pattern Detection */}
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-3">Pattern Analysis:</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(result.patterns).map(([pattern, detected]) => (
                  <div key={pattern} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${detected ? 'bg-purple-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-700 capitalize">
                      {pattern.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}