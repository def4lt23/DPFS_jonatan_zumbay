import React, { useEffect, useState } from "react";

export const LastUser = () => {
  const [user, setUser] = useState([]); // Estado para almacenar el Ultimo usuario
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const URL_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_BASE}/api/users/last`)
      .then((response) => response.json())
      .then((result) => {
        //setUser(result.data);
        let ultimo = result;
        setUser(result.data);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <h2>Último usuario</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <pre>{JSON.stringify(user, null, 2)}</pre> // Muestra el usuario en formato JSON
      )}
    </div>
  );
};
