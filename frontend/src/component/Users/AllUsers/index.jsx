import React, { useEffect, useState } from "react";
import Card from "./Card"; 

export const AllUsers = () => {
  const [users, setUsers] = useState([]); // estado para almacenar la lista de usuarios
  const [loading, setLoading] = useState(true); // estado para manejar la carga de datos
  const [page, setPage] = useState(1); // estado para la paginacion
  const [totalPages, setTotalPages] = useState(1); // estado para el total de paginas
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    setLoading(true); // iniciar la carga de datos

    fetch(`${URL_BASE}/api/users?page=${page}&limit=3`) // llamada a la api con paginacion
      .then((response) => response.json()) // convertir la respuesta a json
      .then((result) => {
        setUsers(result.data || []); // actualizar el estado con los usuarios obtenidos
        setTotalPages(result.meta.pages || 1); // actualizar el estado con el total de paginas
        setLoading(false); // finalizar la carga de datos
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, [page]); // se ejecuta cada vez que cambia la pagina

  return (
    <div>
      <div className="titulo">
        <h2>Listado de Usuarios</h2>
      </div>

      <div className="user-list">
        {loading ? ( // mostrar mensaje de carga si loading es true 
          <p>Cargando usuarios...</p>
        ) : (
          users.map((user) => <Card key={user.id} user={user} />) // mapear los usuarios y renderizar el componente Card para cada uno
        )}
      </div>

      <div className="cont-btn-pag"> 
        <button
          disabled={page === 1} // deshabilitar el boton si estamos en la primera pagina
          onClick={() => setPage(page - 1)} // manejar el click para ir a la pagina anterior
        >
          ◀ Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages} // deshabilitar el boton si estamos en la ultima pagina
          onClick={() => setPage(page + 1)} // manejar el click para ir a la pagina siguiente
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
};
