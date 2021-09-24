import { useCanvas } from './CanvasContext'

const ToolMenu = () => {
  const {
    setTool
  } = useCanvas()
  return (
    <>
      <h4>Formas:</h4>
         <input 
           type="radio" 
           name="draw" 
           value="dda" 
           onClick={() => setTool('line')}
           defaultChecked={true}
         />
         <label> Linea: DDA</label>
         <br />
         <input
           type="radio"
           name="draw"
           onClick={() => setTool('rec')}
         />
         <label> Rectangulo</label>
         <br />
         <input
           type="radio"
           name="draw"
           onClick={() => setTool('square')}
         />
         <label> Cuadrado</label>
         <br />
         <input
           type="radio"
           name="draw"
           onClick={() => setTool('triangle')}
         />
         <label> Triangulo</label>
         <br />
         <input
           type="radio"
           name="draw"
           onClick={() => setTool('circle')}
         />
         <label> Círculo</label>
         <br />
         <input
           type="radio"
           name="draw"
           onClick={() => setTool('fill')}
         />
         <label> Relleno</label>
    </>
  );
}

export default ToolMenu
