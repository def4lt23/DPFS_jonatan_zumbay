import React, { useEffect, useState } from 'react'
import './detail.css'

export const Detail = () => {
  const [product, setProduct] = useState(null) // estado para almacenar los productos
  const [loading, setLoading] = useState(true) // estado para manejar la carga
  const URL_BASE = 'http://localhost:3000'

  useEffect(() => { 
    // Simular una llamada a una API para obtener los productos
    fetch(`${URL_BASE}/api/products/9`)
    .then(response => response.json())
    .then(result => {
      //console.log(result.data)
      setProduct(result.data) // actualizar el estado con los productos obtenidos
      setLoading(false) // actualizar el estado de carga
      console.log(result.data);
    })
  },[])
  return (
    <div>
      <h2>DETALLE DEL PRODUCTO: {product ? product.name : "Cargando..."}</h2>
      <div className='product-list'>
        {product ? (
        <div className="card">
            <img 
                src={`${URL_BASE}${product.image}`}
                alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
        </div>
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  )
}
