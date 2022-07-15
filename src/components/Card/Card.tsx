import './Card.css'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
interface CardProps {
  mealName: string,
  carbs: number,
  units: number,
  date: Date,
  color?: string
  onClick?: (e: any) => void
  id: string,
  draggable?: boolean,
  backgroundColor: string
}

interface CardBlockProps {
  name: string,
  value: string | number,
  valueExtension?: string,
}

const options = { weekday: 'short', month: 'long', day: 'numeric' }

const CardBlock = ({ name, value, valueExtension }: CardBlockProps) => {
  return (
    <>
      <p>{name}</p>
      <p className="value">{value}{valueExtension && valueExtension}</p>
    </>
  )
}

const Card = ({ mealName, carbs, units, date, onClick, id, draggable, backgroundColor }: CardProps) => {
  const [{ x, scale }, api] = useSpring(() => ({
    x: 0,
    scale: 1
  }))

  const bind = useDrag(({ active, movement: [x] }) => {
    return api.start({
      x: active ? x - 10 : 0,
      immediate: name => active && name === 'x'
    })
  }
  )

  const handleDrag = (e: any) => {
    const valueDragged = x.animation.fromValues[0]
    if (valueDragged < -200 || valueDragged > 200) {
      onClick && onClick(e)
    }
  }

  const opacityAmount = x.to({
    map: Math.abs,
    range: [50, 500],
    output: [1, 0.3],
    extrapolate: 'clamp'
  })

  const shouldBind = draggable ? bind() : {}

  return (
    <animated.div {...shouldBind} className={`cardBG ${draggable && 'draggable'}`} style={{ opacity: opacityAmount }}>
      <animated.div style={{ x, scale }}>
        <div id={id} onMouseUp={handleDrag} className="card" style={{ backgroundColor }}>
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
          <span>{date.toLocaleDateString(navigator?.language ?? 'en-US', options)}</span>
        </div>
      </animated.div>
    </animated.div>
  )
}

export default Card
