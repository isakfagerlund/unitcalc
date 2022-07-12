interface WelcomeProps {
  currentUnitCalculation: number
}

const messages = {
  morning: '☀️ Good Morning,',
  evening: '🚀 Good Evening,',
  night: '🌙 Good Night,'
}

const getWelcomeMessage = () => {
  const now = new Date().getHours()

  if (now < 12) {
    return messages.morning
  } else if (now < 20) {
    return messages.evening
  }
  return messages.night
}

const Welcome = ({ currentUnitCalculation }: WelcomeProps) =>
  <div className="app-welcome">
    <p>{getWelcomeMessage()} <b>Isak</b></p>
    <span>Unit Calculation: 10g = {currentUnitCalculation} unit</span>
  </div>

export default Welcome
