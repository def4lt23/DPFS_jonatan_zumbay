import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './component/Navbar'
import { Catalog } from './component/Products/Catalog'
import { Detail } from './component/Products/Detail'
import { Utils } from './component/Products/Utils'
import { AllUsers } from './component/Users/AllUsers'
import { LastUser } from './component/Users/LastUser'
import { LastProduct } from './component/Products/LastProduct'
import { NotFound } from './component/NotFound'

function App() {

  return (
    <div className='container'>
      {/* NAVBAR */}
      <Navbar />
      {/* PANELES CON BOTONES */}
      <div className='dashboard'>
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route path='/users' element={<AllUsers />} />
          <Route path='/last-user' element={<LastUser />} />
          <Route path='/last-product' element={<LastProduct />} />
          <Route path='/utils' element={<Utils />} />
          <Route path='/products/:id' element={<Detail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
