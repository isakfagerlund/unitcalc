import './Card.css'

interface CardProps {
  mealName: string,
  carbs: number,
  units: number,
  date: string,
  key: string
  color?: string
}

interface CardBlockProps {
  name: string,
  value: string | number,
  valueExtension?: string,
}

const CardBlock = ({ name, value, valueExtension }: CardBlockProps) => {

  return (
    <>
      <p>{name}</p>
      <p className="value">{value}{valueExtension && valueExtension}</p>
    </>
  )
}

const Card = ({ mealName, carbs, units, date, color }: CardProps) => (
  <div className="card" style={{ backgroundColor: color }}>
    <div>
      <CardBlock name="Meal Name" value={mealName} />
    </div>
    <div className="cardBottom">
      <div>
        <CardBlock name="Carbs" value={carbs} valueExtension="g" />
      </div>
      <div>
        <CardBlock name="Units" value={units} />
      </div>
    </div>
    <span>{date}</span>
  </div>
)

export default Card;