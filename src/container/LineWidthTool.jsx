import { useCanvas } from '../components/CanvasContext'
import ButtonWidth from '../components/ButtonWidth'
import '../styles/LineWidthTool.css'

const LineWidthTool = () => {
  const {
    lineWidth,
    setLineWidth
  } = useCanvas()
  return (
    <div className='line-width'>
      <ButtonWidth size='1' />
      <ButtonWidth size='2' />
      <ButtonWidth size='4' />
      <ButtonWidth size='6' />
      <ButtonWidth size='8' />
      <ButtonWidth size='10' />
      {/* <input
           type="number"
           name="draw"
           min="1"
           max="10"
           step="1"
           defaultValue={lineWidth}
           onChange={e => setLineWidth(e.target.value)}
         /> */}
    </div>
  )
}

export default LineWidthTool
