import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Link to="/produtos"><Button variant="dark">Ver Produtos</Button></Link>
      <Link to="/gerenciar"><Button variant="dark">Gerenciar Produtos</Button></Link>
    </div>
  )
}
