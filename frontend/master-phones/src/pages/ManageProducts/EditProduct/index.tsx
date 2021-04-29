import React, { useState, useEffect, ChangeEvent} from 'react'
import { Badge, Button, Form, Table } from 'react-bootstrap'
import { Link, useParams, useHistory } from 'react-router-dom'
import './EditProduct.css'
import '../ManageProducts.css'
import api from '../../../services/api'


interface IProduct {
  brand: string;
  name: string;
  imageURL: string;
  price: string;
  gigabytes: number;
  isFiveG: string;

}

interface IParams  {
  id: string;
}


export default function EditProduct() {

  const [productModel, setProductModel] = useState<IProduct>({
    brand: '',
    name: '',
    imageURL: '',
    price: '',
    gigabytes: 0,
    isFiveG: 'Suporta'
  })


  const { id } = useParams<IParams>()

  const history = useHistory()

  
  useEffect(() => {
    loadOneProduct(id)
  }, [id])


  function updateProductModel(event: ChangeEvent<HTMLInputElement>){

    setProductModel({
      ...productModel,
      [event.target.name]: event.target.value

    })

  }

  async function loadOneProduct(id: string){
    const response = await api.get(`/product/${id}`)
    
    setProductModel({
      brand: response.data.brand,
      name: response.data.name,
      imageURL: response.data.imageURL,
      price: response.data.price,
      gigabytes: response.data.gigabytes,
      isFiveG: response.data.isFiveG,

    })

  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault()
    // console.log(productModel)

    const response = await api.put(`/edit-product/${id}`, productModel)
    // console.log(response)
    
    history.push('/gerenciar')
  }

  return (

      <div className="container manage-products">
        <br/>
        <h1>Editar Produto</h1>
        <br/>
        <div className="page-header">
          <Link to="/gerenciar"><Button className="add-productBtn" variant="warning">Voltar ao Painel</Button></Link>
        </div>
        <br/>

        <div className="container  new-product-box">
          <Form onSubmit={onSubmit} className="box-form">
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control 
              name="brand" 
              value={productModel.brand}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}  
              type="text" placeholder="Marca do produto"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
              name="name"
              value={productModel.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)} 
              type="text" placeholder="Modelo do produto" />
            </Form.Group>
          
            <Form.Group>
              <Form.Label>Imagem</Form.Label>
              <Form.Control 
              name="imageURL"
              value={productModel.imageURL}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              type="text" placeholder="URL da Imagem (http://www...)" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Valor</Form.Label>
              <Form.Control 
              name="price"
              value={productModel.price} 
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              type="text" placeholder="1000" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Armazenamento</Form.Label>
              <Form.Control 
              name="gigabytes" 
              value={productModel.gigabytes}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              type="text" placeholder="Capacidade de Armazenamento em GB" />
            </Form.Group>


            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Tecnologia 5G</Form.Label>
              <Form.Control
              value={productModel.isFiveG}
              name="isFiveG"
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateProductModel(event)}
              as="select">
                <option>Suporta</option>
                <option>Não Suporta</option>
              </Form.Control>
            </Form.Group>
            
            <Button className="Btn-addProduct" variant="primary" type="submit">
                Salvar Alterações
            </Button>
          </Form>
        </div>
      </div>
  )
}
