import './Card.css'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
interface CardProps {
  mealName: string,
  carbs: number,
  units: number,
  date: Date,
  color?: string
  vote: {
    up: boolean
    down: boolean
  }
  onClick?: (e: any) => void
  id: string,
  draggable?: boolean,
  backgroundColor: string,
  handleUpvote: (e: any) => void,
  handleDownvote: (e: any) => void
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

const Card = ({ mealName, carbs, units, date, onClick, id, draggable, backgroundColor, handleUpvote, handleDownvote, vote }: CardProps) => {
  const [{ x, scale }, api] = useSpring(() => ({
    x: 0,
    scale: 1
  }))

  const bind = useDrag(({ active, movement: [x] }) => {
    return api.start({
      x: active ? x : 0,
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

  const voteDownSpring = useSpring({
    from: { x: 0 },
    x: vote?.down ? 1 : 0,
    config: { duration: 200 }
  })

  const voteUpSpring = useSpring({
    from: { x: 0 },
    x: vote?.up ? 1 : 0,
    config: { duration: 200 }
  })

  return (
    <animated.div {...shouldBind} className={`cardBG ${draggable && 'draggable'}`} style={{ opacity: opacityAmount }}>
      <animated.div style={{ x, scale }}>
        <div id={id} onTouchEnd={handleDrag} onMouseUp={handleDrag} className="card" style={{ backgroundColor }}>
          <div className="cardBlock">
            <div>
              <CardBlock name="Meal Name" value={mealName} />
            </div>
            <div className="cardBlockRight">
              <div className="cardVote">
                <animated.span
                  style={{
                    scale: voteDownSpring.x.to({ range: [0, 0.5, 1], output: [1, 1.1, 1] })
                  }}
                  className={`voteDown ${vote?.down && 'active'}`} onClick={() => handleDownvote(id)}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4583 1.58331V10.2916M17.4167 7.75831V4.11665C17.4167 3.2299 17.4167 2.78652 17.2441 2.44783C17.0923 2.1499 16.8501 1.90769 16.5522 1.75589C16.2135 1.58331 15.7701 1.58331 14.8833 1.58331H6.42676C5.26975 1.58331 4.69125 1.58331 4.224 1.79503C3.81219 1.98163 3.4622 2.2819 3.21515 2.66055C2.93484 3.09017 2.84688 3.66194 2.67095 4.80549L2.25684 7.49716C2.0248 9.00543 1.90878 9.75957 2.13259 10.3464C2.32904 10.8614 2.69851 11.2921 3.17769 11.5645C3.72363 11.875 4.48664 11.875 6.01266 11.875H6.65C7.09338 11.875 7.31506 11.875 7.48441 11.9613C7.63337 12.0372 7.75448 12.1583 7.83038 12.3072C7.91667 12.4766 7.91667 12.6983 7.91667 13.1416V15.4645C7.91667 16.5427 8.79066 17.4166 9.86879 17.4166C10.1259 17.4166 10.359 17.2652 10.4634 17.0302L13.124 11.0439C13.245 10.7716 13.3055 10.6355 13.4012 10.5356C13.4857 10.4474 13.5895 10.3799 13.7045 10.3385C13.8346 10.2916 13.9835 10.2916 14.2815 10.2916H14.8833C15.7701 10.2916 16.2135 10.2916 16.5522 10.1191C16.8501 9.96727 17.0923 9.72505 17.2441 9.42713C17.4167 9.08844 17.4167 8.64506 17.4167 7.75831Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </animated.span>
                <animated.span
                  style={{
                    scale: voteUpSpring.x.to({ range: [0, 0.5, 1], output: [1, 1.1, 1] })
                  }}
                  className={`voteUp ${vote?.up && 'active'}`} onClick={() => handleUpvote(id)}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.54167 17.4166V8.70831M1.58333 10.2916V15.8333C1.58333 16.7078 2.29221 17.4166 3.16667 17.4166H13.7958C14.968 17.4166 15.9649 16.5614 16.1432 15.4028L16.9957 9.86112C17.2171 8.42244 16.1039 7.12498 14.6483 7.12498H11.875C11.4378 7.12498 11.0833 6.77054 11.0833 6.33331V3.53544C11.0833 2.45731 10.2093 1.58331 9.13121 1.58331C8.87406 1.58331 8.64102 1.73475 8.53658 1.96974L5.75062 8.23817C5.62355 8.52407 5.34004 8.70831 5.02718 8.70831H3.16667C2.29221 8.70831 1.58333 9.4172 1.58333 10.2916Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </animated.span>
              </div>
              <span>{date.toLocaleDateString(navigator?.language ?? 'en-US', (options as any))}</span>
            </div>
          </div>
          <div className="cardBlock">
            <div>
              <CardBlock name="Carbs" value={carbs} valueExtension="g" />
            </div>
            <div>
              <CardBlock name="Units" value={units} />
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  )
}

export default Card
