import "./allusers.css";

const Card = ({ user }) => {
  const URL_BASE = "http://localhost:3000/images/users/";

  return (
    <div className="user-card">
      <img
        src={`${URL_BASE}${user.avatar}`} // avatar del usuario
        alt={user.username || "Usuario"} // texto alternativo por si no hay imagen
      />

      <div className="text-card">
        <h3>{user.username}</h3>
        <h6>{user.role}</h6>
        <br />
        <h5>
          {user.name} {user.lastname} | {user.email}
        </h5>
      </div>
    </div>
  );
};

export default Card; // exportamos el componente Card
