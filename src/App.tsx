import { useState } from 'react'
import './App.css'
import Button from './components/Button/Button'
import useLocalStorage from './helpers/useLocalStorage'
import Card from './components/Card/Card'
import Welcome from './components/Welcome/Welcome'
import { generateUniqueId } from './helpers/generateUniqueId'
import { Meal } from './types'
import Dialog from './components/Dialog/Dialog'
import Settings from './pages/Settings'
import Login from './pages/Login'

const roundHalf = (num: number) => {
  return Math.round(num * 2) / 2
}

const colorArray = [
  'var(--primary)',
  'var(--purple)',
  'var(--yellow)'
]

const App = () => {
  const [currentUnitCalculation] = useLocalStorage('unitCalculation', 0.5)
  const [username] = useLocalStorage('username', '')
  const [currentCarbs, setCurrentCarbs] = useState(0)
  const [calculatedUnitAmount, setCalculatedUnitAmount] = useState(0)
  const [currentMealName, setCurrentMealName] = useState('Food')
  const [pastMeals, setPastMeals] = useLocalStorage('pastMeals', [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentCardInProgress, setCurrentCardInProgress] = useState('')
  const [showSettings, setShowSettings] = useLocalStorage('showSettings', 0)

  const handleChange = (event: any) => setCurrentCarbs(event.target.value && parseInt(event.target.value, 10))

  const handleSubmit = () => {
    const calculatedUnits = roundHalf(
      (currentCarbs / 10) * currentUnitCalculation
    )
    setCalculatedUnitAmount(calculatedUnits)
    setPastMeals([
      ...pastMeals,
      {
        name: currentMealName,
        carbs: currentCarbs,
        units: calculatedUnits,
        date: new Date(),
        id: generateUniqueId(),
        vote: { up: false, down: false }
      }
    ])
  }

  const handleSetCarbs = (type: 'decrese' | 'increase') => {
    if (type === 'decrese') {
      if (currentCarbs === 0) return
      return setCurrentCarbs(currentCarbs - 10)
    }
    return setCurrentCarbs(currentCarbs + 10)
  }

  const handleOk = () => {
    const removeCard = pastMeals.filter((meal: Meal) => meal.id !== currentCardInProgress)
    setPastMeals(removeCard)
    setDialogOpen(false)
  }

  const handleCardDelete = (e: any) => {
    setDialogOpen(true)
    const cardID = e.currentTarget.id
    setCurrentCardInProgress(cardID)
  }

  const resetVotes = (id: string) => {
    const updatedArray = pastMeals.map((meal: Meal) => meal.id === id ? { ...meal, vote: { up: false, down: false } } : meal)
    setPastMeals(updatedArray)
  }

  const handleUpvote = (id: string) => {
    const item = pastMeals.find((meal: Meal) => meal.id === id)
    if (item.vote.up) {
      return resetVotes(id)
    }
    const updatedArray = pastMeals.map((meal: Meal) => meal.id === id ? { ...meal, vote: { up: true, down: false } } : meal)
    setPastMeals(updatedArray)
  }

  const handleDownvote = (id: string) => {
    const item = pastMeals.find((meal: Meal) => meal.id === id)
    if (item.vote.down) {
      return resetVotes(id)
    }
    const updatedArray = pastMeals.map((meal: Meal) => meal.id === id ? { ...meal, vote: { up: false, down: true } } : meal)
    setPastMeals(updatedArray)
  }

  const increaseCarbs = () => handleSetCarbs('increase')
  const decreaseCarbs = () => handleSetCarbs('decrese')

  let currentColorIndex = 0

  if (username.length < 1) {
    return <Login />
  }

  if (showSettings) {
    return <Settings />
  }

  return (
    <>
      <div className="wrapper">
        <Welcome username={username} currentUnitCalculation={currentUnitCalculation} setShowSettings={setShowSettings} />
        <div className='dataInputs'>
          <div>
            <p>Meal name</p>
            <input
              value={currentMealName}
              onChange={(e) => setCurrentMealName(e.target.value)}
            />
          </div>
          <div className="carbs">
            <div>
              <p>Carbs</p>
              <input
                min="0"
                type="number"
                step="10"
                value={currentCarbs}
                onChange={handleChange}
              />
            </div>
            <div className='carbButtons'>
              <Button onClick={decreaseCarbs}>-</Button>
              <Button onClick={increaseCarbs}>+</Button>
            </div>
          </div>
          {calculatedUnitAmount > 0 && (
            <p>
            You should use <span style={{ color: 'var(--text-black)' }}>{calculatedUnitAmount} units</span> 💧
            </p>
          )}
          <div className="calculate">
            <Button onClick={handleSubmit}>Calculate</Button>
          </div>
        </div>

        <p className='history'>History</p>
        <div className="mealList">
          {pastMeals.map((meal: Meal, i: any) => {
            if (currentColorIndex >= 2) {
              currentColorIndex = 0
            } else {
              currentColorIndex++
            }

            return (
              <Card
                onClick={handleCardDelete}
                backgroundColor={colorArray[currentColorIndex]}
                draggable
                id={meal.id}
                key={i}
                mealName={meal.name}
                carbs={meal.carbs}
                units={meal.units}
                date={new Date(meal.date)}
                vote={meal.vote}
                handleUpvote={handleUpvote}
                handleDownvote={handleDownvote} />
            )
          })}
        </div>
      </div>
      <Dialog isOpen={dialogOpen} setIsOpen={setDialogOpen} handleOk={handleOk} handleCancel={() => setDialogOpen(false)} /></>
  )
}

export default App
