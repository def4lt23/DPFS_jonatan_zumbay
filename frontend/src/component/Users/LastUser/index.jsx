import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../AllUsers/Card";
import "./lastuser.css";

export const LastUser = () => {
  const [user, setUser] = useState(null); //estado para almacenar el usuario
  const [loading, setLoading] = useState(true); //estado para manejar la carga de datos
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_BASE}/api/users/last`)
      .then((response) => response.json()) //convertir la respuesta a json
      .then((result) => {
        setUser(result.data); //almacenar el usuario en el estado
        setLoading(false); //indicar que la carga ha terminado
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="contenedor-lastuser">
      <div className="titulo">
        <h2>Ultimo Usuario</h2>
      </div>

      {loading ? ( //mostrar mensaje de carga mientras se obtienen los datos
        <p>Cargando...</p>
      ) : (
        user && ( //verificar que el usuario exista antes de renderizar el componente Card
          <div className="contenedor-card-user">
            <Card user={user} />
            <Link to="/" className="btn-detail">
              Volver al catálogo
            </Link>
          </div>
        )
      )}
    </div>
  );
};
