import React, { useEffect, useState } from "react";
import "./catalog.css";
import { Card } from "./card.jsx";

export const Catalog = () => {
  const [products, setProducts] = useState([]); // almacena los productos obtenidos
  const [loading, setLoading] = useState(true); //carga inicial
  const [page, setPage] = useState(1); // pagina actual
  const [totalPages, setTotalPages] = useState(1); // total de paginas
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {setLoading(true); // inicia la carga de productos

    fetch(`${URL_BASE}/api/products?page=${page}&limit=6`) // llama a la API para obtener los productos
      .then((response) => response.json()) // convierte la respuesta a JSON
      .then((result) => {
        setProducts(result.data || []); // actualiza el estado con los productos obtenidos
        setTotalPages(result.meta.pages || 1); // actualiza el total de paginas
        setLoading(false); // finaliza la carga
      })
      .catch((err) => {
        console.log("Error cargando productos", err);
        setLoading(false);
      });
  }, [page]); // se ejecuta cada vez que cambia la pagina

  return (
    <div>
      <div className="titulo">
        <h2>Listado de productos</h2>
      </div>
      <div className="product-list">
        {loading ? ( // muestra un mensaje de carga mientras se obtienen los productos
          <p>Cargando productos...</p>
        ) : products.length > 0 ? ( // muestra los productos si hay alguno
          products.map((item) => <Card key={item.id} product={item} />) // mapea los productos y los muestra en tarjetas
        ) : ( // si no 
          <p>No hay productos para mostrar</p>
        )}
      </div>

      <div className="cont-btn-pag">
        <button
          className="btn-paginado"
          disabled={page === 1} // deshabilita el boton si esta en la primera pagina
          onClick={() => setPage(page - 1)} // cambia a la pagina anterior
        > ◀ Anterior
        </button>

        <span>
          Pagina {page} de {totalPages} 
        </span>

        <button
          className="btn-paginado"
          disabled={page === totalPages} // deshabilita el boton si esta en la ultima pagina
          onClick={() => setPage(page + 1)} // cambia a la pagina siguiente
        > Siguiente ▶
        </button>
      </div>
    </div>
  );
};
