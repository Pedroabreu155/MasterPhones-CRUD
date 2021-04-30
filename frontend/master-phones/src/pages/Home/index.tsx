import { type } from 'node:os'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import fire from '../../firebase/firebaseAuth'
import './Home.css'



export default function Home() {

  const [user, setUser] = useState({})
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function clearInputs(){
    setEmail('')
    setPassword('')
  }

  function clearErrors(){
    setEmailError('')
    setPasswordError('')
  }

  async function handleLogin(){
    clearErrors()
    await fire.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      switch(error.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message)
          break;
        
        case "auth/wrong-password":
          setPasswordError(error.message)
          break;
      }
    })

    // fire.auth().onAuthStateChanged(user => {
    //   console.log(typeof user)
    // })
  }

  function authenticateListenner(){
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs()
        setUser(user)
      } else{
        setUser({})
      }
    })
  }

  useEffect(() => {
    authenticateListenner()
  }, [])

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
          <Form.Control
          value={email}
          onChange={event => setEmail(event.target.value)} 
          type="email" placeholder="Digite seu Email"/>
          <p>{emailError}</p>
        </Form.Group>

        <Form.Group controlId="Senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control
          required 
          value={password}
          onChange={event => setPassword(event.target.value)}
          type="password" placeholder="Digite sua Senha" />
          <p>{passwordError}</p>
        </Form.Group>
        <div className="btn-form-div">
          <Link to={
            user ? "/gerenciar" : "/"
          }><Button onClick={handleLogin} className="login-btn" variant="dark">Gerenciar Produtos</Button></Link>
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
