import type { NextPage } from 'next';
import { TextAnalyzer } from '../components/TextAnalyzer';
import Footer from '../components/layout/Footer';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
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