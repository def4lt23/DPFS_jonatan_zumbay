import "./detail.css";
import { Link } from "react-router-dom";

export const ProductDetailCard = ({ product }) => {
  const URL_BASE = "http://localhost:3000"; //URL del servidor para las img

  return (
    <div className="detalle-centro">
      <div className="detail-container">
        <img
          className="detail-imagen"
          src={`${URL_BASE}${product.image}`}
          alt={product.name}
        />
      
        <div className="detail-info">
          <h2>{product.name}</h2>

          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>

          <p><b>Tamaño:</b> {product.size}</p>
          <p><b>Stock:</b> {product.stock}</p>
          <p><b>Modelo:</b> {product.model?.name}</p>

          <div>
            <b>Colores: </b>
            {product.colors?.map((c) => ( // recorrer colores
              <span key={c.id} className="color-pill">
                {c.name}
              </span>
            ))}
          </div>

          <Link to="/" className="btn-detail">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};
