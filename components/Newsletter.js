import { useState } from 'react'

import Api from '../api'

const Newsletter = ({ classes }) => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState({
      status: false,
      message: ''
  })
  const [subscription, setSubscription] = useState(false)

  const handleChange = e => setEmail(e.target.value)
  const handleSubmit = () => {
    const api = new Api(process.env.NEXT_PUBLIC_API_PATH)
    api.newsletter(email)
    .then(() => {
        setSubscription(true)
        setEmail('')
        setError({
            status: false,
            message: ''
        })
    })
    .catch(err => {
        const { message } = err.response.data
        const { status } = err.response
        setError({
            status,
            message
        })
    })
  }

  return (
    <div className={classes.join(" ")}>
        <input type="email" value={email} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        { error.status && `Errore ${error.status}: ${error.message}` }
        { subscription && 'Sottoscrizione avvenuta correttamente.' }
    </div>
  )
}

export default Newsletter
