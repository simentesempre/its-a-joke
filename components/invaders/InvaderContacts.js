import { useState, useRef, useEffect } from 'react'

import Api from '../../api'

const Contacts = () => {
  const api = useRef(new Api(process.env.apiPath))

  const [form, setForm] = useState({
      name: '',
      email: '', 
      text: '',
      group: null
  })
  const [error, setError] = useState({
      status: false,
      message: ''
  })
  const [subscription, setSubscription] = useState(false)
  const [createAGame, setCreateAGame] = useState(false)

  const handleChange = e => setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }))
  const handleClick = value => setCreateAGame(value)
  const handleSubmit = () => {
    const { email, name, text, group } = form
    const newsletterPromise = api.current.newsletter(email, name, group)
    const sendPromise = api.current.send(text, email, name)
    Promise.all([newsletterPromise, sendPromise])
    .then(() => {
        setSubscription(true)
        setCreateAGame(false)
        setForm({
            name: null,
            email: null, 
            text: null,
            group: null
        })
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

  useEffect(() => {
    setForm(prevForm => ({ ...prevForm, group: createAGame ? 'Developer' : null }))
  }, [createAGame])

  return (
    <div className="contacts">
        <input type="text" value={form.name} onChange={handleChange} />
        <input type="email" value={form.email} onChange={handleChange} />
        <button onClick={() => handleClick(false)} className={`${createAGame ? '' : 'selected'}`}>Play a game</button>
        <button onClick={() => handleClick(true)} className={`${createAGame ? 'selected' : ''}`}>Create a game</button>
        <textarea onChange={handleChange} value={form.text} />
        <button onClick={handleSubmit}>Now you can click</button>
        { error.status && `Errore ${error.status}: ${error.message}` }
        { subscription && 'Sottoscrizione avvenuta correttamente.' }
    </div>
  )
}

export default Contacts
