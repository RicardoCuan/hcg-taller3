import {useEffect} from 'react'
import {useCanvas} from '../components/CanvasContext'

const Canvas = () => {
  const {
    canvasRef,
    prepareCanvas,
    draw,
  } = useCanvas()
  
  useEffect(() => {
    prepareCanvas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      className='canvas'
      ref={canvasRef}
      onClick={e => draw(e)}
    />
  )
}

export default Canvas
