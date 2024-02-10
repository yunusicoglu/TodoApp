import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import ContainerMain from './containers/containers'

function App() {

  return (
    <>
      <BrowserRouter>
        <ContainerMain/>
      </BrowserRouter>
    </>
  )
}

export default App
