import { useCanvas } from './components/CanvasContext'
import Canvas from './components/Canvas'
import LineWidthTool from './components/LineWidthTool'
import ToolMenu from './components/ToolMenu'
import ColorMenu from './components/ColorMenu'
import './App.css'

function App() {
  const {
    canvasRef,
  } = useCanvas()

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas.getContext) return
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="container">
      <Canvas/>
       <section className="info">
       <h1>Taller 1</h1>
       <div className="form">
        <ToolMenu />
         <br />
         <br />
         <h4>Personalización:</h4>
         <LineWidthTool/>
         <br />
         <ColorMenu />
         <br />
         <br />
         <button onClick={clearCanvas}>Borrar todo</button>
       </div>
       </section>
     </div>
  )
}

export default App
