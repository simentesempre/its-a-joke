import Head from 'next/head'
import SplashPage from '../components/SplashPage'

const Home = () => {
  return (
    <div>
      <Head>
        <title>{process.env.siteTitle}</title>
      </Head>
      <SplashPage />
    </div>
  )
}

export default Home