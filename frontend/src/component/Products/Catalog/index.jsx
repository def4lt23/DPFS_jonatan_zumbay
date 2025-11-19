import React, { useEffect, useState } from 'react'
import './catalog.css'
import { Card } from './card.jsx'

export const Catalog = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const URL_BASE = 'http://localhost:3000'

  useEffect(() => {
    setLoading(true)

    fetch(`${URL_BASE}/api/products?page=${page}&limit=6`)
      .then(response => response.json())
      .then(result => {
        setProducts(result.data || [])
        setTotalPages(result.meta.pages || 1)
        setLoading(false)
      })
      .catch(err => {
        console.log("Error cargando productos", err)
        setLoading(false)
      })
  }, [page])

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

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          ◀ Anterior
        </button>

        <span>Página {page} de {totalPages}</span>

        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  )
}


