import { useState } from 'react';
import { format } from 'date-fns'
import './App.css';
import Button from './components/Button'
import useLocalStorage from './helpers/useLocalStorage'

// interface Meal {
//   name: string,
//   carbs: number,
//   units: number
// }

const roundHalf = (num: number) => {
  return Math.round(num * 2) / 2;
};

function App() {
  const [currentUnitCalculation, setCurrentUnitCalculation] = useState<number>(0.5);
  const [currentCarbs, setCurrentCarbs] = useState(0);
  const [calculatedUnitAmount, setCalculatedUnitAmount] = useState(0);
  const [currentMealName, setCurrentMealName] = useState('Food');
  const [pastMeals, setPastMeals] = useLocalStorage("pastMeals", []);

  const handleChange = (event) => setCurrentCarbs(event.target.value && parseInt(event.target.value, 10));

  const handleSubmit = () => {
    const calculatedUnits = roundHalf(
      (currentCarbs / 10) * currentUnitCalculation
    );
    setCalculatedUnitAmount(calculatedUnits);
    setPastMeals([
      ...pastMeals,
      { name: currentMealName, carbs: currentCarbs, units: calculatedUnits, date: format(new Date(), 'MM/dd/yyyy')},
    ]);
  };

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
    <div className="App">
      <div className="app-welcome">
        <p>☀️ Good Morning, <b>Isak</b></p>
        <span>Unit Calculation: 10g = {currentUnitCalculation} unit</span>
      </div>
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
      <div className="calculate">  
        {pastMeals.map((meal, index) => (
          <p key={index}>
            {meal.name} - {meal.carbs}g - {meal.units} units - {meal.date}
          </p>
        ))}
        <Button onClick={handleSubmit}>Calculate</Button>
      </div>
    </div>
  );
}

export default App;
