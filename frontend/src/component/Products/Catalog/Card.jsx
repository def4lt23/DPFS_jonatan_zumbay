import "./catalog.css";
import { Link } from "react-router-dom";

export const Card = ({ product }) => {

  const URL_BASE = "http://localhost:3000"; //url del backend
  
  return (
    <div className="product-card">
      <img src={`${URL_BASE}${product.image}`} alt={product.name} />
      <div className="text-card">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <Link to={`/products/${product.id}`} className="btn-detail">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};
