//import './catalog.css'
export const Card = ({user}) => { // desestructuramos el prop product
  const URL_BASE = 'http://localhost:3000/images/users/'
  return (
     <div className="user-card">
      <img 
        src={`${URL_BASE}${user.avatar}`}
        alt={user.username}
      />
      <div className='text-card'>
        <h3>{user.username}</h3>
        <h6>{user.role}</h6>
        <br />
        <h5>{user.name} {user.lastname} | {user.email}</h5>
      </div>
    </div>
  )
}
