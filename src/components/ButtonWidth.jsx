import { BsCircleFill } from 'react-icons/bs'
import { useCanvas } from './CanvasContext'
import '../styles/ButtonWidth.css'

const ButtonWidth = ({size}) => {
  const {
    setLineWidth
  } = useCanvas()

  return (
    <div>
      <input
        className='button-width--input'
        type="radio"
        name="width"
        defaultChecked={size==='1' ? true : false} // El tamaño 1 será el default
        id={size}
        onClick={() => setLineWidth(size)}
      />
      <label htmlFor={size} className='button-width--label'>
        <BsCircleFill size={size*5}/>
      </label>
    </div>
  );
}

export default ButtonWidth
