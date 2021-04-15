import Head from 'next/head'

const MetaHead = () => {
  return (
    <Head>
        <title>{process.env.siteTitle}</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/splash/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/splash/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/splash/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/splash/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/splash/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/splash/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/splash/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/splash/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/splash/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/icons/splash/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/splash/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/splash/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/splash/favicon-16x16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="msapplication-TileColor" content="#fce000"/>
        <meta name="msapplication-TileImage" content="/icons/splash/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#fce000"/>
    </Head>
  )
}

export default MetaHead