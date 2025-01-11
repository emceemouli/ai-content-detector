import type { AppProps } from 'next/app';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}