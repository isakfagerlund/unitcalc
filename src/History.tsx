import Card from './components/Card/Card'
import useLocalStorage from './helpers/useLocalStorage'
import Button from './components/Button/Button'
import { useHistory } from 'react-router-dom'
import './App.css'
import './History.css'
import { Meal } from './types'
import Welcome from './components/Welcome/Welcome'

const History = () => {
  const [pastMeals] = useLocalStorage('pastMeals', [])
  const [currentUnitCalculation] = useLocalStorage('unitCalculation', 0.5)
  const history = useHistory()

  return (
    <div className="scrollWrapper">
      <Welcome currentUnitCalculation={currentUnitCalculation} />
      <p className="title">History</p>
      <div className="mealList">
        {pastMeals.map((meal: Meal, i: any) => {
          return <Card key={i} mealName={meal.name} carbs={meal.carbs} units={meal.units} date={meal.date} />
        })}
      </div>
      <div className="back">
        <Button onClick={() => history.push('/')}>Back</Button>
      </div>
    </div>
  )
}

export default History
