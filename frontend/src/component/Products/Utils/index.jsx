import React, { useEffect, useState } from "react";
import "./utils.css";

export const Utils = () => {
  const [color, setColor] = useState([]); //guardar los colores
  const [modelo, setModelo] = useState([]); //guardar los modelos
  const [loading, setLoading] = useState(true); //estado de carga
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_BASE}/api/products/utils`)
      .then((response) => response.json())
      .then((result) => {
        setColor(result.data.colors || []); // Asegura que colors existe
        setModelo(result.data.models || []); // Asegura que models existe
        setLoading(false); //cambia el estado de carga
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
      <h2>Lista de Colores</h2>
    </div>
    {loading ? ( //muestra cargando mientras se obtienen los colores
      <p>Cargando colores...</p>
    ) : (
      <div className="color-list">
        {color.map((col) => ( //mapea y muestra cada color
          <div
            key={col.id}
            className="color-card"
            title={col.name}
          >
            {col.name}
          </div>
        ))}
      </div>
    )}
  </div>

  <div className="modelos">
    <div className="titulo">
      <h2>Lista de Modelos</h2>
    </div>
    {loading ? ( //muestra cargando mientras se obtienen los modelos
      <p>Cargando modelos...</p>
    ) : (
      <div className="modelo-list">
        {modelo.map((mod) => ( //mapea y muestra cada modelo
          <div key={mod.id} className="modelo-card">
            {mod.name}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};
