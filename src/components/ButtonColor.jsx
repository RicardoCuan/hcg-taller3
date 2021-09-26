import { useCanvas } from './CanvasContext'
import '../styles/ButtonColor.css'

const ButtonColor = ({color}) => {
  const {
    setLineColor
  } = useCanvas()
  return (
    <>
      <button
        className='button-color--button'
        style={{backgroundColor:color, gridArea:color}}
        onClick={() => setLineColor(color)}
      ></button>
    </>
  )
}

export default ButtonColor
