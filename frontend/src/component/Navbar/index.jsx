import './Navbar.css'
import { Link } from 'react-router-dom' /*porque uso los links*/

export const Navbar = () => {
  return (
    <div className='navbar'>
        <ul className='navbar-link'>
            <li><Link to="/">TOTAL DE PRODUCTOS</Link></li>
            <li><Link to="/users">TOTAL DE USUARIOS</Link></li>
            <li><Link to="/utils">TOTAL DE CATEGORIAS</Link></li>
        </ul>

        <Link to="/"><img src="/logo_verdev3.png" alt="" /></Link>
        
        <ul className='navbar-link'>
            <li><Link to="/last-product">ULTIMO PRODUCTO AGREGADO</Link></li>
            <li><Link to="/last-user">ULTIMO USUARIO AGREGADO</Link></li>
            <li><Link to="/categories">PRODUCTO POR CATEGORIAS</Link></li>
        </ul>
    </div>
  )
}
