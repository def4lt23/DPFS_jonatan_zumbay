import React, { useEffect, useState } from 'react'
import './catalog.css'
import { Card } from './card.jsx'

export const Catalog = () => {
  const [products, setProducts] = useState([])   // ⬅️ Ahora es array vacío
  const [loading, setLoading] = useState(true)
  const URL_BASE = 'http://localhost:3000'

  useEffect(() => {
    fetch(`${URL_BASE}/api/products`)
      .then(response => response.json())
      .then(result => {
        setProducts(result.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.log("Error cargando productos", err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h2>Listado de productos</h2>

      <div className='product-list'>
        {loading ? (
          <p>Cargando productos...</p>
        ) : products.length > 0 ? (
          products.map(item => (
            <Card key={item.id} product={item} />
          ))
        ) : (
          <p>No hay productos para mostrar</p>
        )}
      </div>
    </div>
  )
}

