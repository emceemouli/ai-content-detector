import { useEffect } from 'react';

export const InArticleAd: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638771792216412';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="my-8">
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="pub-7638771792216412">
      </ins>
    </div>
  );
};