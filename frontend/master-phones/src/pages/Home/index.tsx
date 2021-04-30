import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import fire from '../../firebase/firebaseAuth'
import './Home.css'



export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  useEffect(() => {
    handleLogin("pedro@email.com", "147258369")
  }, [])

  function handleLogin(email: string, password: string){


    let auth = fire.auth()
    auth.signInWithEmailAndPassword(email, password)
    
    auth.onAuthStateChanged(user => {
      if(user){
        console.log("Usuário logado!")
      } else{
        console.log("Ninguém está logado!")
      }
    })
  }

  const history = useHistory()

  function viewProducts(){
    history.push('/produtos')
  }

  return (
    <>
    <div className="container first-box-form">
      <br/>
      <Form>
        <h4 className="subtitle-form">Faça Login para Gerenciar os protudos</h4>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Digite seu Email"/>
        </Form.Group>

        <Form.Group controlId="Senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Digite sua Senha" />
        </Form.Group>
        <div className="btn-form-div">
          <Link to="/gerenciar"><Button className="login-btn" variant="dark">Gerenciar Produtos</Button></Link>
        </div>
      </Form>
      <br/>
    </div>
    <hr style={{width: "45%"}}/>
    <div className="container second-box-form">
      <h4 className="subtitle-form">Visualizar os Produtos</h4>
      <Link to="/produtos"><Button onClick={viewProducts} className="login-btn" variant="dark">Ver Produtos</Button></Link>
    </div>
    </>
  )
}
