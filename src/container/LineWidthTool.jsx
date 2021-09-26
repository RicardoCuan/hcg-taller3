import ButtonWidth from '../components/ButtonWidth'
import '../styles/LineWidthTool.css'

const LineWidthTool = () => {
  return (
    <div className='line-width'>
      <ButtonWidth size='1' />
      <ButtonWidth size='2' />
      <ButtonWidth size='4' />
      <ButtonWidth size='6' />
      <ButtonWidth size='8' />
      <ButtonWidth size='10' />
    </div>
  )
}

export default LineWidthTool
