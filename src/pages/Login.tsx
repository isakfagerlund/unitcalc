import Button from '../components/Button/Button'
import { useState } from 'react'
import useLocalStorage from '../helpers/useLocalStorage'

const Login = () => {
  const [username, setUsername] = useLocalStorage('username', '')
  const [currentUnitCalculation, setCurrentUnitCalculaion] = useLocalStorage('unitCalculation', 0.5)
  const [inputUsername, setInputUsername] = useState(username)
  const [inputUnit, setInputUnit] = useState(currentUnitCalculation)

  const handleChange = (e: any, type: string) => {
    if (type === 'username') {
      setInputUsername(e.target.value)
    } else {
      setInputUnit(e.target.value)
    }
  }

  const handleSubmit = () => {
    setUsername(inputUsername)
    setCurrentUnitCalculaion(inputUnit)
    location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="wrapper login">
      <p><b>Choose a name</b></p>
      <input placeholder="Name" value={inputUsername} onChange={(e) => handleChange(e, 'username')} required />
      <p><b>Your insuling calculation</b></p>
      <div className="unitExample">
        <span>Example: 80g carbs * 0.5 = 4 Units</span>
      </div>
      <input value={inputUnit} onChange={(e) => handleChange(e, 'unit')} required />
      <Button>Confirm</Button>
    </form>
  )
}

export default Login
