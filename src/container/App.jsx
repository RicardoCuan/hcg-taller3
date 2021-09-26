import Canvas from './Canvas'
import LineWidthTool from './LineWidthTool'
import ToolMenu from './ToolMenu'
import ColorMenu from './ColorMenu'
import Footer from './Footer'
import Header from './Header'
import '../styles/App.css'

function App() {
  return (
    <div className='app-container'>
      <Header />
      <Canvas />
      <ToolMenu />
      <LineWidthTool />
      <ColorMenu />
      <Footer />
    </div>
  )
}

export default App
