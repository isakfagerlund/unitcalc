interface WelcomeProps {
  currentUnitCalculation: number
}

const Welcome = ({ currentUnitCalculation }: WelcomeProps) =>
  <div className="app-welcome">
    <p>☀️ Good Morning, <b>Isak</b></p>
    <span>Unit Calculation: 10g = {currentUnitCalculation} unit</span>
  </div>

export default Welcome
