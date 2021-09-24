import {createContext, useContext, useRef, useState} from 'react'
import {lineDDA,rectangleDDA,squareDDA,triangleDDA,circumference,floodFill} from '../utils/drawTool'

export const CanvasContext = createContext(null)

export const CanvasProvider = ({ children }) => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [countPoint, setCountPoint] = useState(0)
  const [arrayPointX, setArrayPointX] = useState([])
  const [arrayPointY, setArrayPointY] = useState([])
  const [tool, setTool] = useState('line')
  const [lineWidth, setLineWidth] = useState(1)
  const [lineColor, setLineColor] = useState('#00000')

  /** Se debe de ejecutar al renderizar el componente. Setup del canvas */
  const prepareCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas.getContext) return

    canvas.width = (window.innerWidth*0.7) * 2
    canvas.height = (window.innerHeight) * 2
    canvas.style.width = `${window.innerWidth*0.7}px`
    canvas.style.height = `${window.innerHeight}px`
  
    const context = canvas.getContext("2d")
    context.scale(2,2)

    contextRef.current = context
  }

  /** Lógica del dibujo en canvas */
  const draw = ({nativeEvent}) => {
    const { offsetX, offsetY } = nativeEvent
    console.log(`
      x=${offsetX},y=${offsetY}
      tool=${tool}
      color=${lineColor}
      width=${lineWidth}
    `)
    // Herramientas que necesitan 1 clic
    if(tool === 'fill') return floodFill(canvasRef, contextRef, offsetX,offsetY,{r:200,g:200,b:200})

    // Herramientas que necesitan 2 clic
    setPoint(1,nativeEvent)
    if(tool === 'line') return lineDDA(contextRef, lineColor, lineWidth, arrayPointX[0],arrayPointY[0],offsetX,offsetY)
    if(tool === 'rec') return rectangleDDA(contextRef, lineColor, lineWidth, arrayPointX[0],arrayPointY[0],offsetX,offsetY)
    if(tool === 'square') return squareDDA(contextRef, lineColor, lineWidth, arrayPointX[0],arrayPointY[0],offsetX,offsetY)
    if(tool === 'circle') return circumference(contextRef, lineColor, lineWidth, arrayPointX[0],arrayPointY[0],offsetX,offsetY)
    
    // Herramientas que necesitan 3 clic
    setPoint(2,nativeEvent)
    if(tool === 'triangle') return triangleDDA(contextRef, lineColor, lineWidth, arrayPointX[0],arrayPointY[0],arrayPointX[1],arrayPointY[1],offsetX,offsetY)
  }

  const setPoint = (max, nativeEvent) => {
    const { offsetX, offsetY } = nativeEvent
    if(countPoint < max){ 
      setArrayPointX([...arrayPointX, offsetX])
      setArrayPointY([...arrayPointY, offsetY])
      setCountPoint(countPoint+1)
      return
    }
    setCountPoint(0)
    setArrayPointX([])
    setArrayPointY([])
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        tool,
        lineColor,
        lineWidth,
        setTool,
        setLineColor,
        setLineWidth,
        draw,
        prepareCanvas
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext)
