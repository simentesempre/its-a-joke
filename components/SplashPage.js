import MetaHead from './global/MetaHead'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import FadeIn from 'react-fade-in'

const SplashPage = () => {
  return (
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
  )
}

export default SplashPage