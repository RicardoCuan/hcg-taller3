import { useCanvas } from './CanvasContext'

const ColorMenu = () => {
  const {
    lineColor,
    setLineColor
  } = useCanvas()
  return (
    <>
      <label>Color </label>
      <input
        type="color"
        name="draw"
        defaultValue={lineColor}
        onChange={e => setLineColor(e.target.value)}
      />
    </>
  );
}

export default ColorMenu;
