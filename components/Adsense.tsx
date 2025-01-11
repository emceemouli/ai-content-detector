import { useEffect, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: {
      push: (config?: unknown) => void;
    }[];
  }
}

export const InArticleAd: React.FC = () => {
  const [adsbygoogle, setAdsbygoogle] = useState<Window['adsbygoogle'] | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638771792216412';
      script.async = true;
      script.onload = () => {
        setAdsbygoogle(window.adsbygoogle || []);
        // If you need to push something immediately after the script loads, you can do it here:
        if (window.adsbygoogle) {
          try {
            window.adsbygoogle.push({}); 
          } catch (err) {
            console.error('AdSense error:', err);
          }
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  // This useEffect might not be necessary if you push in the onload callback
  useEffect(() => { 
    if (adsbygoogle) {
      try {
        adsbygoogle.push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [adsbygoogle]);

  return (
    <div className="my-8">
      {adsbygoogle && (
        <ins className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="pub-7638771792216412">
        </ins>
      )}
    </div>
  );
};