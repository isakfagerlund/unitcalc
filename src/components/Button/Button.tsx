import './Button.css'

const Button = (props: any) => <button className='button' {...props}>{props.children}</button>

export default Button
