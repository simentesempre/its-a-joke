import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import FadeIn from 'react-fade-in'

const SplashPage = () => {
  return (
    <>
        <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-CGMJ6RLDVZ"></script>
            <script>
                var window.dataLayer = window.dataLayer || []
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date())
                gtag('config', 'G-CGMJ6RLDVZ')
            </script>
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
        <div className="splash-wrapper">
            <div className="splash">
                <FadeIn delay={0} className="section mask">
                    <img src="/images/splash/ITSAJ_layout_maschera.png" alt={process.env.siteTitle} />
                </FadeIn>
                <FadeIn delay={200} className="section body">
                    <p>
                        Once you realize what<br />
                        a joke everything is,<br />
                        being the Comedian is<br />
                        the only thing that<br />
                        makes sense.<br />
                    </p>
                </FadeIn>
                <FadeIn delay={400} className="section logo">
                    <img src="/images/splash/ITSAJ_layout_logo.png" alt={process.env.siteTitle} />
                </FadeIn>
                <FadeIn delay={500} className="section body">
                    <p>
                        Coming soon
                    </p>
                    <p className="social">
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/itsajokegames/"> 
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://twitter.com/itsajokegames/"> 
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </p>
                </FadeIn>
            </div>
        </div>
    </>
  )
}

export default SplashPage