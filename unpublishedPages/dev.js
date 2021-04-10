import Head from 'next/head'
import Newsletter from '../components/Newsletter'

const Dev = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Newsletter classes={['uno','due']} />
    </div>
  )
}

export default Dev