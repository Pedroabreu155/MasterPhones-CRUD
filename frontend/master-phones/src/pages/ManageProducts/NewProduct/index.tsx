import React, { useState, useEffect} from 'react'
import { Badge, Button, Form, Table } from 'react-bootstrap'
import '../ManageProducts.css'
import './NewProduct.css'
import api from '../../../services/api'


interface IProduct {
  id: string;
  brand: string;
  name: string;
  price: string;
  gigabytes: number;
  isFiveG: boolean;

}


export default function NewProduct() {

  

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
          <Form className="box-form">
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" placeholder="Marca do produto"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control type="text" placeholder="Modelo do produto" />
            </Form.Group>
          
            <Form.Group>
              <Form.Label>Imagem</Form.Label>
              <Form.Control type="text" placeholder="URL da Imagem (http://www...)" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Valor</Form.Label>
              <Form.Control type="text" placeholder="1000" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Armazenamento</Form.Label>
              <Form.Control type="text" placeholder="Capacidade de Armazenamento em GB" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Tecnologia 5G" />
            </Form.Group>
            
            <Button className="Btn-addProduct" variant="primary" type="submit">
                Adicionar
            </Button>
          </Form>
        </div>
      </div>
  )
}
