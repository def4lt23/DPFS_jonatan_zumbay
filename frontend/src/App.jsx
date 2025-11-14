import './App.css'
import { Navbar } from './component/Navbar'
import { Catalog } from './component/Products/Catalog'
import { Detail } from './component/Products/Detail'

function App() {

  return (
    <div className='container'>
      {/* NAVBAR */}
      <Navbar />
      {/* PANELES CON BOTONES */}
      <div>
        <Catalog />
        <Detail />
        <p>MAS</p>
        <p>MAS</p>
        <p>COSAS</p>
      </div>
    </div>
  )
}

export default App
