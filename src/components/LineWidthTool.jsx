import { useCanvas } from './CanvasContext'

const LineWidthTool = () => {
  const {
    lineWidth,
    setLineWidth
  } = useCanvas()
  return (
    <>
      <label>Grosor </label>
      <input
           type="number"
           name="draw"
           min="1"
           max="10"
           step="1"
           defaultValue={lineWidth}
           onChange={e => setLineWidth(e.target.value)}
         />
    </>
  );
}

export default LineWidthTool
