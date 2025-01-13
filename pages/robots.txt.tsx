import { GetServerSideProps } from 'next'

const RobotsTxt = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://ai-content-detector-mu.vercel.app/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()

  return {
    props: {},
  }
}

export default RobotsTxt