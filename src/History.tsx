import Card from './components/Card/Card'
import useLocalStorage from './helpers/useLocalStorage'
import Button from './components/Button/Button'
import { useHistory } from "react-router-dom";
import './App.css';

const History = () => {
  const [pastMeals, setPastMeals] = useLocalStorage("pastMeals", []);
  let history = useHistory();

  return <div className="App">
    <p>History</p>
    {pastMeals.map((meal, i) => {
      return <Card key={i} mealName={meal.name} carbs={meal.carbs} units={meal.units} date={meal.date}  />
    })}
    <div className="back">
      <Button onClick={() => history.push('/')}>Back</Button>
    </div>
  </div>
} 

export default History;