import '../styles/ButtonTool.css'
import { useCanvas } from './CanvasContext'

const ButtonTool = ({toolName, check, children}) => {
  const {
    setTool
  } = useCanvas()

  return (
    <div style={{ gridArea:toolName }}>
      <input
        className="button-tool--input"
        type="radio"
        name="tool"
        defaultChecked={check ? true : false}
        id={toolName}
        onClick={() => setTool(toolName)}
      />
      <label className="button-tool--label" htmlFor={toolName}>
        {children}
      </label>
    </div>
  );
}

export default ButtonTool
