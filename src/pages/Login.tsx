import Button from '../components/Button/Button'
import { useState } from 'react'
import useLocalStorage from '../helpers/useLocalStorage'

const Login = () => {
  const [, setUsername] = useLocalStorage('username', '')
  const [input, setInput] = useState('')

  const handleChange = (e: any) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    setUsername(input)
    location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="wrapper login">
      <input placeholder="Name" value={input} onChange={handleChange} required></input>
      <Button>Choose Name</Button>
    </form>
  )
}

export default Login
