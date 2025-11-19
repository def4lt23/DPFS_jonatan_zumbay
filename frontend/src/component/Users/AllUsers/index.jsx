import React, { useEffect, useState } from 'react'
import { Card } from './card.jsx'
import './allusers.css'

export const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const URL_BASE = 'http://localhost:3000'

  useEffect(() => {
    fetch(`${URL_BASE}/api/users`)
      .then(response => response.json())
      .then(result => {
        setUsers(result.data)
        setLoading(false)
      })
      .catch(error => console.log('error', error))
  }, [])

  return (
    <div>
      <h2>Listado de Usuarios</h2>

      <div className='users-list'>
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : (
          users.map(user => (
            <Card key={user.id} user={user} />
          ))
        )}
      </div>
    </div>
  )
}
