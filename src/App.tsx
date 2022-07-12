import { useState } from 'react'
import { format } from 'date-fns'
import './App.css'
import Button from './components/Button/Button'
import useLocalStorage from './helpers/useLocalStorage'
import Card from './components/Card/Card'
import Welcome from './components/Welcome/Welcome'
import { useHistory } from 'react-router-dom'

interface Meal {
  name: string,
  carbs: number,
  units: number,
  date: string
}

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
  const [currentCarbs, setCurrentCarbs] = useState(0)
  const [calculatedUnitAmount, setCalculatedUnitAmount] = useState(0)
  const [currentMealName, setCurrentMealName] = useState('Food')
  const [pastMeals, setPastMeals] = useLocalStorage('pastMeals', [])

  const history = useHistory()

  let currentMealIndex = 0

  const handleChange = (event: any) => setCurrentCarbs(event.target.value && parseInt(event.target.value, 10))

  const handleSubmit = () => {
    const calculatedUnits = roundHalf(
      (currentCarbs / 10) * currentUnitCalculation
    )
    setCalculatedUnitAmount(calculatedUnits)
    setPastMeals([
      ...pastMeals,
      { name: currentMealName, carbs: currentCarbs, units: calculatedUnits, date: format(new Date(), 'E e. LLL') }
    ])
  }

  const handleSetCarbs = (type: 'decrese' | 'increase') => {
    if (type === 'decrese') {
      if (currentCarbs === 0) return
      return setCurrentCarbs(currentCarbs - 10)
    }
    return setCurrentCarbs(currentCarbs + 10)
  }

  const increaseCarbs = () => handleSetCarbs('increase')
  const decreaseCarbs = () => handleSetCarbs('decrese')

  return (
    <div className="wrapper">
      <Welcome currentUnitCalculation={currentUnitCalculation} />
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
      </div>

      <div className="pastMeals folded" onClick={() => history.push('/history')}>
        <p className='history'>History</p>
        {pastMeals.slice(pastMeals.length - 3, pastMeals.length).map((meal: Meal, i: any) => {
          if (currentMealIndex < 2) {
            currentMealIndex++
          } else {
            currentMealIndex = 0
          }

          const topMargin = 50

          return <div key={i} style={{ top: (10 * i) + topMargin }}><Card color={colorArray[currentMealIndex]} mealName={meal.name} carbs={meal.carbs} units={meal.units} date={meal.date} /></div>
        })}
      </div>
      <div className="calculate">
        <Button onClick={handleSubmit}>Calculate</Button>
      </div>
    </div>
  )
}

export default App
