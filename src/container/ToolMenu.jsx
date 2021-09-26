import { useCanvas } from '../components/CanvasContext'
import ButtonTool from '../components/ButtonTool'

import { HiOutlineMinus } from 'react-icons/hi'
import { BsCircle, BsTriangle } from 'react-icons/bs'
import { BiRectangle, BiSquare } from 'react-icons/bi'
import { VscPaintcan } from 'react-icons/vsc'
import { FaEraser } from 'react-icons/fa'

import '../styles/ToolMenu.css'

const ToolMenu = () => {
  const {
    clearCanvas
  } = useCanvas()

  return (
    <div className="tool-menu">
      <div className='tool-menu--grid'>
        <ButtonTool toolName='line' check>
          <HiOutlineMinus size='200' className='line-icon' />
        </ButtonTool>
        <ButtonTool toolName='circle'>
          <BsCircle size='40' />
        </ButtonTool>
        <ButtonTool toolName='rec'>
          <BiRectangle size='50' />
        </ButtonTool>
        <ButtonTool toolName='square'>
          <BiSquare size='50' />
        </ButtonTool>
        <ButtonTool toolName='triangle'>
          <BsTriangle size='40' />
        </ButtonTool>
        <ButtonTool toolName='fill'>
          <VscPaintcan size='50' />
        </ButtonTool>

        <button 
          className='tool-menu--button' 
          onClick={() => clearCanvas()}
        >
          <FaEraser size='30' />
        </button>
      </div>
    </div>
  );
}

export default ToolMenu
