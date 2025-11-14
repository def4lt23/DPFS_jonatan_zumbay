import './Navbar.css'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <a href="/"><img src="/logo_blancov3.png" alt="" /></a>
        <ul className='navbar-link'>
            <li><a href="">TOTAL DE PRODUCTOS</a></li>
            <li><a href="">TOTAL DE USUARIOS</a></li>
            <li><a href="">TOTAL DE CATEGORIAS</a></li>
            <li><a href="">ULTIMO PRODUCTO AGREGADO</a></li>
            <li><a href="">ULTIMO USUARIO AGREGADO</a></li>
            <li><a href="">PRODUCTO POR CATEGORIAS</a></li>
        </ul>
    </div>
  )
}
