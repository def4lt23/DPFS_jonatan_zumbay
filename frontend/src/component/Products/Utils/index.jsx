import React, { useEffect, useState } from "react";
import "./utils.css";

export const Utils = () => {
  const [color, setColor] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_BASE}/api/products/utils`)
      .then((response) => response.json())
      .then((result) => {
        setColor(result.data.colors || []); // Asegurarse de que result.data.colors existe
        setModelo(result.data.models || []); // Asegurarse de que result.data.models existe
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error cargando utils", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="contenedor">
      <div className="colores">
        <div className="titulo">
          <h1>Lista de Colores</h1>
        </div>
        {loading ? (
          <p>Cargando colores...</p>
        ) : (
          <ul>
            {color.map((col, index) => (
              <li key={col.id}>{col.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="modelos">
        <div className="titulo">
          <h1>Lista de Modelos</h1>
        </div>
        {loading ? (
          <p>Cargando modelos...</p>
        ) : (
          <ul>
            {modelo.map((mod, index) => (
              <li key={mod.id}>{mod.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
