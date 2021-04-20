import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

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
    group: ''
  } 

  const router = useRouter()

  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState(defaultError)
  const [subscription, setSubscription] = useState(false)
  const [createAGame, setCreateAGame] = useState(false)

  const goTo = route => router.push(route)

  const handleChange = e => setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }))
  const handleClick = value => setCreateAGame(value)
  const handleSubmit = () => {
    const { email, name, text, group } = form
    api.current.newsletter(email, name, group)
    .then(() => {
        setSubscription(true)
        setError(defaultError)
        if(text !== '') {
          api.current.send(text, email, name)
          .then(() => {
            setCreateAGame(false)
            setForm(defaultForm)
            goTo('/invaders/thanks')
          })
          .catch(err => {
            setError({
              status: err.response?.status || 'Undefined',
              message: err.response?.data?.message || err
            })
          })
        } else {
          setCreateAGame(false)
          setForm(defaultForm)
          goTo('/invaders/thanks')
        }
    })
    .catch(err => {
      console.log(err)
      setError({
        status: err.response?.status || 'Undefined',
        message: err.response?.data?.message || err
      })
    })
  }

  useEffect(() => {
    setForm(prevForm => ({ ...prevForm, group: createAGame ? 'Developer' : '' }))
  }, [createAGame])

  return (
    <div className="invaders contacts">
        <div>
          <label>How do you want we call you?</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Give us your mail so that we can hack you</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Are you interested in...</label>
          <div className="contacts-buttons">
            <button onClick={() => handleClick(false)} className={`${createAGame ? '' : 'selected'}`}>Playing a game</button>
            <button onClick={() => handleClick(true)} className={`${createAGame ? 'selected' : ''}`}>Creating a game</button>
          </div>
        </div>
        <div>
          <label>Here you can write your excuses</label>
          <textarea onChange={handleChange} name="text" value={form.text} />
        </div>
        <div>
          <p className="small">By clicking here you'll subscribe to our newsletter<br />and declare to agree with our  <a href="https://www.iubenda.com/privacy-policy/63870221" target="_blank" title="Privacy Policy ">privacy Policy</a>.<br />Don't worry, no ads, no spam. We promise.</p>
          <button className="selected" onClick={handleSubmit}>Now you can click</button>
        </div>
        <div>
          { error.status && `${error.status} - ${error.message}` }
          { subscription && 'Subscription confirmed.' }
        </div>
        
        
    </div>
  )
}

export default Contacts
