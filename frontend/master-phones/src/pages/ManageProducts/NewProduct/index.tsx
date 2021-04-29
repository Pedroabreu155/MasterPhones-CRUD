import React, { useState, useEffect, ChangeEvent} from 'react'
import { Badge, Button, Form, Table } from 'react-bootstrap'
import '../ManageProducts.css'
import './NewProduct.css'
import api from '../../../services/api'


interface IProduct {
  brand: string;
  name: string;
  imageURL: string;
  price: string;
  gigabytes: number;
  isFiveG: string;

}


export default function NewProduct() {

  const [productModel, setProductModel] = useState<IProduct>({
    brand: '',
    name: '',
    imageURL: '',
    price: '',
    gigabytes: 0,
    isFiveG: 'off'
  })

  function updateProductModel(event: ChangeEvent<HTMLInputElement>){

    setProductModel({
      ...productModel,
      [event.target.name]: event.target.value

    })

  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault()

    const response = await api.post('new-product', productModel)
    // console.log(response)
    
  }

  return (

      <div className="container manage-products">
        <br/>
        <h1>Adicionar Novo Produto</h1>
        <br/>
        <div className="page-header">
          <Button className="add-productBtn" variant="warning">Voltar ao Painel</Button>
        </div>
        <br/>

        <div className="container  new-product-box">
          <Form onSubmit={onSubmit} className="box-form">
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control 
              name="brand" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}  
              type="text" placeholder="Marca do produto"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
              name="name" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)} 
              type="text" placeholder="Modelo do produto" />
            </Form.Group>
          
            <Form.Group>
              <Form.Label>Imagem</Form.Label>
              <Form.Control 
              name="imageURL" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              type="text" placeholder="URL da Imagem (http://www...)" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Valor</Form.Label>
              <Form.Control 
              name="price" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              type="text" placeholder="1000" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Armazenamento</Form.Label>
              <Form.Control 
              name="gigabytes" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              type="text" placeholder="Capacidade de Armazenamento em GB" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check 
              name="isFiveG" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              type="checkbox" label="Tecnologia 5G" />
            </Form.Group>
            
            <Button className="Btn-addProduct" variant="primary" type="submit">
                Adicionar
            </Button>
          </Form>
        </div>
      </div>
  )
}
