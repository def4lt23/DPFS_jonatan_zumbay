import React, { useEffect, useState } from 'react'
import './catalog.css'
import { Card } from './Card.jsx'

export const Catalog = () => {
  const [products, setProducts] = useState(null) // estado para almacenar los productos
  const [loading, setLoading] = useState(true) // estado para manejar la carga
  const URL_BASE = 'http://localhost:3000'

  useEffect(() => { 
    // Simular una llamada a una API para obtener los productos
    fetch(`${URL_BASE}/api/products`)
    .then(response => response.json())
    .then(result => {
      //console.log(result.data)
      setProducts(result.data) // actualizar el estado con los productos obtenidos
      setLoading(false) // actualizar el estado de carga
    })
  },[])
  return (
    <div>
      <h2>Listado de productos</h2>
      <div className='product-list'>
        {products ? (
        products.map(item => {
          return <Card key={item.id} product={item} /> // renderizar un componente Card por cada producto
        })
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  )
}
