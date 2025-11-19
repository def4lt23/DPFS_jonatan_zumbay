import React, { useEffect, useState } from 'react'
import './detail.css'
import { useParams } from 'react-router-dom'
import { Card } from '../Catalog/card' // Importar el componente Card desde catalogo

export const Detail = () => {
  const [product, setProduct] = useState(null) // Producto inicial es null
  const [loading, setLoading] = useState(true) // Estado de carga
  const [notFound, setNotFound] = useState(false) // Estado de no encontrado

  const URL_BASE = 'http://localhost:3000'
  const { id } = useParams() // Obtener el ID del producto desde la URL

  useEffect(() => { 
    fetch(`${URL_BASE}/api/products/${id}`)
      .then(response => response.json())
      .then(result => {
        // SI NO EXISTE (meta.status === 404)
        if (!result.data) {
          setNotFound(true) // Marcar como no encontrado
          setLoading(false) // Terminar carga
          return
        }

        setProduct(result.data) // Guardar el producto en el estado
        setLoading(false) // Terminar carga
      })
      .catch(() => {
        setNotFound(true) // En caso de error marcar como no encontrado
        setLoading(false) // Terminar carga
      })

  }, [id]) // Ejecutar cuando el ID cambie

  if (loading) {
    return <h2>Cargando producto...</h2>
  }

  if (notFound) { // si produco no encontrado
    return (
      <div className="not-found">
        <h1>Producto no encontrado</h1>
        <img 
          src="/lamperror.png"
          alt="Producto no encontrado"
          style={{ width: "250px" }}
        />
      </div>
    )
  }
  return ( // Mostrar detalle del producto encontrado
    <Card product={product} />
  )
}
