import { useState, useRef, useEffect } from 'react'

import Api from '../../api'

const Contacts = () => {
  const api = useRef(new Api(process.env.NEXT_PUBLIC_API_PATH))
  const defaultError = {
      status: false,
      message: ''
  }
  const defaultForm = {
    name: '',
    email: '', 
    text: '',
    group: null
  } 

  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState(defaultError)
  const [subscription, setSubscription] = useState(false)
  const [createAGame, setCreateAGame] = useState(false)

  const handleChange = e => setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }))
  const handleClick = value => setCreateAGame(value)
  const handleSubmit = () => {
    const { email, name, text, group } = form
    api.current.newsletter(email, name, group)
    .then(() => {
        setSubscription(true)
        setCreateAGame(false)
        setForm(defaultForm)
        setError(defaultError)
        api.current.send(text, email, name)
        .then(() => {
          setError(defaultError)
        })
        .catch(err => {
          const { message } = err.response.data
          const { status } = err.response
          setError({
            status,
            message
        })
      })
    })
    .catch(err => {
      console.error(err.response)
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
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        <button onClick={() => handleClick(false)} className={`${createAGame ? '' : 'selected'}`}>Play a game</button>
        <button onClick={() => handleClick(true)} className={`${createAGame ? 'selected' : ''}`}>Create a game</button>
        <textarea onChange={handleChange} name="text " value={form.text} />
        <button onClick={handleSubmit}>Now you can click</button>
        { error.status && `Errore ${error.status}: ${error.message}` }
        { subscription && 'Sottoscrizione avvenuta correttamente.' }
    </div>
  )
}

export default Contacts
