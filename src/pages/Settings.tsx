import { useState } from 'react'
import Button from '../components/Button/Button'
import useLocalStorage from '../helpers/useLocalStorage'

const Settings = () => {
  const [username, setUsername] = useLocalStorage('username', '')
  const [currentUnitCalculation, setCurrentUnitCalculaion] = useLocalStorage('unitCalculation', 0.5)
  const [inputUsername, setInputUsername] = useState(username)
  const [inputUnit, setInputUnit] = useState(currentUnitCalculation)
  const [, setShowSettings] = useLocalStorage('showSettings', 0)

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
    setShowSettings(0)
    location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="wrapper settings">
      <p>Settings</p>
      <input value={inputUsername} onChange={(e) => handleChange(e, 'username')} required />
      <input value={inputUnit} onChange={(e) => handleChange(e, 'unit')} required />
      <Button>Update profile</Button>
      <span onClick={() => {
        setShowSettings(0)
        location.reload()
      }} className="settingsClose">X</span>
    </form>
  )
}

export default Settings
