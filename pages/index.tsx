import Head from 'next/head';
import TextAnalyzer from '../components/TextAnalyzer';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Content Detector - Free AI Text Analysis Tool</title>
        <meta 
          name="description" 
          content="Free online tool to detect AI-generated content. No registration required." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              AI Content Detector
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Free tool to detect AI-generated content. No registration required.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <TextAnalyzer />
          </div>
        </div>
      </main>
    </>
  );
}