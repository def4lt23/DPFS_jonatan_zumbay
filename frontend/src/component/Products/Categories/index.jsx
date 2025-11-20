import React, { useEffect, useState } from "react";
import { Card } from "../Catalog/card"; // card de catalogo
import "./categories.css";

export const Categories = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_BASE}/api/products?limit=1000`) // limite de 1000 por usar paginacion
      .then(res => res.json()) // convertir a json
      .then(result => { 
        setProducts(result.data || []); // almacenar productos en el estado
        setLoading(false); // finalizar carga
      })
      .catch(err => {
        console.log("Error cargando productos", err);
        setLoading(false);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  // Agrupar productos por categoría
  const grouped = products.reduce((acc, product) => { // reducir array de productos a un objeto agrupado
    const category = product.model?.name || "Sin categoria"; // manejar productos sin categoria
    // el ?. es para evitar errores si model es undefined
    if (!acc[category]) acc[category] = []; // si no existe la categoria, crear array
    acc[category].push(product); // agregar producto a la categoria correspondiente
    return acc; // retornar acumulador
  }, {}); // objeto inicial

  return (
    <div className="categories-wrapper">
      {loading ? ( // mostrar mensaje de carga
        <p>Cargando categorías...</p> 
      ) : (
        Object.entries(grouped).map(([categoryName, items]) => ( // iterar sobre categorias agrupadas
          <div key={categoryName} className="category-block">
            <div className="titulo">
              <h2>{categoryName} ({items.length} productos)</h2>
            </div>
            <div className="category-cards">
              {items.map(item => ( // renderizar cada producto
                <Card key={item.id} product={item} /> // usar componente Card para cada producto
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
