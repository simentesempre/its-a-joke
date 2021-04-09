import Head from 'next/head'
/* import SplashPage from '../components/SplashPage' */
import FullVideo from '../components/FullVideo'

const Home = () => {
  return (
    <div>
      <Head>
        <title>{process.env.siteTitle}</title>
      </Head>
      <FullVideo />
    </div>
  )
}

export default Home