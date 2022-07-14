import './Button.css'

const Button = (props: any) => <button style={{ backgroundColor: props.color }} className='button' {...props}>{props.children}</button>

export default Button
