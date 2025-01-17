import type { NextPage } from 'next';
import Head from 'next/head';
import TextAnalyzer from '@/components/TextAnalyzer';
import Footer from '@/components/layout/Footer';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>AI Content Detector</title>
        <meta 
          name="description" 
          content="Advanced AI detection with dynamic pattern recognition and linguistic analysis" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI detection, content analysis, text analysis, AI content detector" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ai-content-detector-mu.vercel.app" />
        <meta property="og:title" content="AI Content Detector" />
        <meta property="og:description" content="Advanced AI detection with dynamic pattern recognition" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ai-content-detector-mu.vercel.app" />
        <meta property="twitter:title" content="AI Content Detector" />
        <meta property="twitter:description" content="Advanced AI detection with dynamic pattern recognition" />
        
        <link rel="canonical" href="https://ai-content-detector-mu.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow bg-gradient-to-b from-gray-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              AI Content Detector
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI detection with dynamic pattern recognition
            </p>
          </div>
          <TextAnalyzer />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;