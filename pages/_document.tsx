import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google AdSense Auto Ads */}
          <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-7638771792216412"
            crossOrigin="anonymous"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "pub-7638771792216412",
                  enable_page_level_ads: true
                });
              `
            }}
          />
          
          {/* Meta tags */}
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;