import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <>
    <div className="container first-box-form">
      <br/>
      <Form>
        <h4 className="subtitle-form">Faça Login para gerenciar os protudos</h4>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Digite seu Email"/>
        </Form.Group>

        <Form.Group controlId="Senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Digite sua Senha" />
        </Form.Group>
      </Form>
      <Link to="/gerenciar"><Button variant="dark">Gerenciar Produtos</Button></Link>
      <br/>
    </div>
    <hr style={{width: "45%"}}/>
    <div className="container second-box-form">
      <h4 className="subtitle-form">Visualizar os Produtos</h4>
      <Link to="/produtos"><Button variant="dark">Ver Produtos</Button></Link>
    </div>
    </>
  )
}
