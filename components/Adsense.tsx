import { useEffect, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const InArticleAd = () => {
  const [adsbygoogle, setAdsbygoogle] = useState<any[] | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638771792216412';
    script.async = true;
    script.onload = () => {
      setAdsbygoogle(window.adsbygoogle || []);
    };
    document.head.appendChild(script);
  }, []);

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