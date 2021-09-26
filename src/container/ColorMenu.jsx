import { useCanvas } from '../components/CanvasContext'
import ButtonColor from '../components/ButtonColor'
import '../styles/ColorMenu.css'

const ColorMenu = () => {
  const {
    lineColor,
    setLineColor
  } = useCanvas()
  return (
    <div className='color-menu'>
      <div className="color-menu--grid">
        <ButtonColor color='#000000' />
        <ButtonColor color='#666666' />
        <ButtonColor color='#0050CA' />
        <ButtonColor color='#FFFFFF' />
        <ButtonColor color='#A8AAAA' />
        <ButtonColor color='#26C9FE' />
        <ButtonColor color='#02731A' />
        <ButtonColor color='#671507' />
        <ButtonColor color='#954114' />
        <ButtonColor color='#0FB03F' />
        <ButtonColor color='#FF0018' />
        <ButtonColor color='#FB7A26' />
        <ButtonColor color='#B1701E' />
        <ButtonColor color='#9A0050' />
        <ButtonColor color='#CD5A55' />
        <ButtonColor color='#FEC12A' />
        <ButtonColor color='#FF008E' />
        <ButtonColor color='#FEB0A6' />
      </div>
      <input
        className='color-menu--input'
        type="color"
        name="draw"
        defaultValue={lineColor}
        onChange={e => setLineColor(e.target.value)}
      />
    </div>
  )
}

export default ColorMenu
