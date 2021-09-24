import {useEffect} from 'react'
import {useCanvas} from './CanvasContext'

const Canvas = () => {
  const {
    canvasRef,
    prepareCanvas,
    draw,
  } = useCanvas()
  
  useEffect(()=>{
    prepareCanvas()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onClick={draw}
    />
  )
}

export default Canvas
