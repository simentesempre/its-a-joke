import React, { useState } from "react"
import YouTube from 'react-youtube'
import axios from 'axios'
import Logo from './assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const Landing = () => {

  const youtubeOpts = {
    width: '100%',
    height: '380',
    playerVars: {
      modestbranding: 0,
      rel: 0
    }
  }

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscriptionMessage, setSubscriptionMessage] = useState(false)

  const handleSendClick = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/newsletter`, { 
          email
      }, {
          headers: {
              'content-type': 'application/json'
          }
      })
      .then(res => {
        setSubscriptionMessage('Subscription sent')
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }

  return (
    <div className="landing">
      <YouTube
        videoId="oLHqWhilXps"
        opts={youtubeOpts}
      />
      <div className="logo">
        <img src={Logo} alt="L'Année" />
      </div>
      <p>
        L’Année is a videogame homage to the 1995 movie "La Haine".<br />
        It's a last goodbye to this shitty year.<br /> 
        It's the saddest game of the saddest year. <br />
        But most of all...<br />
        IT'S A JOKE.
      </p>
      <p>
        <strong className="text-uppercase">
          Available on 31.12.2020
        </strong>
      </p>
      <p>
        <strong className="text-uppercase">
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/itsajokegames/">FOLLOW US ON <FontAwesomeIcon icon={faInstagram} /></a>
        </strong>
      </p>
      {subscriptionMessage ? <p>
        {subscriptionMessage}
      </p> : <p>
        <label className="text-uppercase">
          Enter your email to stay updated
        </label>
        <input type="email" value={email} onChange={ e => setEmail(e.target.value) } />
        <small>
          No spam, no ads, we promise <br />
          By clicking the "Send" button I agree with the terms in the <a rel="noreferrer" target="_blank" href="https://www.iubenda.com/privacy-policy/63870221" title="Privacy Policy ">Privacy Policy</a>
        </small>
        <button className="text-uppercase" onClick={handleSendClick}>Send</button>
        { error }
      </p> }
    </div>
  )
}

export default Landing
