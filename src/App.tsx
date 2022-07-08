import { useState } from 'react';
import './App.css';

interface Meal {
  name: string,
  carbs: number,
  units: number
}

const roundHalf = (num: number) => {
  return Math.round(num * 2) / 2;
};

function App() {
  const [currentUnitCalculation, setCurrentUnitCalculation] = useState<number>(0.5);
  const [currentCarbs, setCurrentCarbs] = useState(0);
  const [calculatedUnitAmount, setCalculatedUnitAmount] = useState(0);
  const [currentMealName, setCurrentMealName] = useState('');
  const [pastMeals, setPastMeals] = useState<Meal[]>([]);

  const handleChange = (event) => setCurrentCarbs(event.target.value);

  const handleSubmit = () => {
    const calculatedUnits = roundHalf(
      (currentCarbs / 10) * currentUnitCalculation
    );
    setCalculatedUnitAmount(calculatedUnits);
    setPastMeals([
      ...pastMeals,
      { name: currentMealName, carbs: currentCarbs, units: calculatedUnits },
    ]);
  };

  return (
    <div className="App">
      <h2>Unit Calc</h2>
      <p>Your personal unit calculation per 10g Example: 20g = 1 unit</p>
      <input
        value={currentUnitCalculation}
        onChange={(e) => setCurrentUnitCalculation(parseInt(e.target.value, 10))}
      />
      <p>Name of dish</p>
      <input
        value={currentMealName}
        onChange={(e) => setCurrentMealName(e.target.value)}
      />
      <p>How many carbs in the meal?</p>
      <input
        type="number"
        step="10"
        value={currentCarbs}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Calculate</button>
      {calculatedUnitAmount > 0 && (
        <p style={{ fontWeight: 'bold' }}>
          You should use {calculatedUnitAmount} units
        </p>
      )}
      {pastMeals.map((meal, index) => (
        <p key={index}>
          {meal.name} - {meal.carbs}g - {meal.units} units
        </p>
      ))}
    </div>
  );
}

export default App;
