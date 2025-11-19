import React, { useEffect, useState } from "react";

export const LastProduct = () => {
  const [product, setProduct] = useState([]); // Estado para almacenar el Ultimo producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_BASE}/api/products/last`)
      .then((response) => response.json())
      .then((result) => {
        let ultimo = result;
        setProduct(result.data);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <h2>Ultimo producto</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <pre>{JSON.stringify(product, null, 2)}</pre> // Muestra el producto en formato JSON
      )}
    </div>
  );
};