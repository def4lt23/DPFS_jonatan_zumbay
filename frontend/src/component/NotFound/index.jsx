import React from 'react'
import './notfound.css'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='vista_error'>
        <h1>Pagina no encontrada</h1>
        <img src="/lamperror.png" alt="Lampara Error" />
        <Link to='/'>Volver a Home</Link>
    </div>
  )
}
