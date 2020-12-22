import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Landing from './Landing'

import './index.css'

const render = () => {
  return process.env.REACT_APP_STATUS === 'landing' ? <Landing /> : <App />
}

ReactDOM.render(
  <>
    { render() }
  </>,
  document.getElementById('root')
)