import { GetServerSideProps } from 'next'

const Sitemap = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://ai-content-detector-mu.vercel.app'

  // Create sitemap XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap