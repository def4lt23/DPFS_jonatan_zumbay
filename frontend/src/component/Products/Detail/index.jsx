import React, { useEffect, useState } from "react";
import "./detail.css";
import { useParams } from "react-router-dom";
import { ProductDetailCard } from "./ProductDetailCard";
import { NotFound } from "../../NotFound";

export const Detail = () => {
  const [product, setProduct] = useState(null); // Producto inicial es null
  const [loading, setLoading] = useState(true); // Estado de carga
  const [notFound, setNotFound] = useState(false); // Estado de no encontrado

  const URL_BASE = "http://localhost:3000";
  const { id } = useParams(); // Obtener el ID del producto desde la URL

  useEffect(() => {
    fetch(`${URL_BASE}/api/products/${id}`)
      .then((response) => response.json()) // convertir respuesta a JSON
      .then((result) => {
        if (!result.data) { // Si no hay datos del producto
          setNotFound(true); // marcar como no encontrado
          setLoading(false); // terminar carga
          return;
        }
        // si el producto es encontrado
        setProduct(result.data); // guardar el producto en el estado
        setLoading(false); // terminar carga
      })
      .catch(() => {
        setNotFound(true); // en caso de error marcar como no encontrado
        setLoading(false); // terminar carga
      });
  }, [id]); // ejecutar cuando el ID cambie

  if (loading) { // mientras carga
    return <h2>Cargando producto...</h2>;
  }

  if (notFound) { // si no se encontro el producto
    return <NotFound />;
  }
  return ( // mostrar detalle del producto
    <div className="detail-page">
      <div className="titulo">
        <h2>Detalle del Producto: {product.name}</h2>
      </div>
      <ProductDetailCard product={product} /> 
    </div>
  );
};
