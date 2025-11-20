import React, { useEffect, useState } from "react";
import { ProductDetailCard } from "../Detail/ProductDetailCard";
import './lastproduct.css';

export const LastProduct = () => {
  const [product, setProduct] = useState([]); //guardar el producto
  const [loading, setLoading] = useState(true); //estado de carga 
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_BASE}/api/products/last`) 
      .then((response) => response.json()) //convierte la respuesta en json
      .then((result) => { 
        setProduct(result.data); //guarda el producto en el estado
        setLoading(false); //cambia el estado de carga
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="last-product-wrapper">
      <div className="titulo">
      <h2>Ultimo producto</h2>
      </div>

      {loading ? ( //muestra cargando mientras se obtiene el producto
        <p>Cargando...</p>
      ) : (
        <div className="last-product-card-center"> 
          <ProductDetailCard product={product} />
        </div>
      )}
    </div>
  );
};
