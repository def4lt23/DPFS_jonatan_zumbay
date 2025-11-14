import './catalog.css'
export const Card = ({product}) => { // desestructuramos el prop product
  const URL_BASE = 'http://localhost:3000'
  return (
     <div className="product-card">
      <img 
        src={`${URL_BASE}${product.image}`}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  )
}
