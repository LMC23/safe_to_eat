import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState(null)

  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const { error } = await signUp({ email, password })

    if (error) return setError(error)

   navigate('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <div>{error && JSON.stringify(error)}</div>

        
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>

      <br/>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  )
}