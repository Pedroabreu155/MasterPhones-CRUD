import React, { useState, useEffect} from 'react'
import { Table, Badge, Button, Modal, ModalDialog } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import api from '../../services/api'

import './ViewProducts.css'


interface IProduct {
  id: string;
  brand: string;
  name: string;
  imageURL: string;
  price: string;
  gigabytes: number;
  isFiveG: string;

}

export default function ViewProducts() {

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal(){
    setShowModal(false)
  }
  function handleShowModal(){
    setShowModal(true)
  }


  const [allProducts, setAllProducts] = useState<IProduct[]>([])

  const [productModel, setProductModel] = useState<IProduct>({
    id: '',
    brand: '',
    name: '',
    imageURL: '',
    price: '',
    gigabytes: 0,
    isFiveG: 'Suporta'
  })

  async function loadOneProduct(id: string){
    const response = await api.get(`/product/${id}`)
    
    setProductModel({
      id: response.data.id,
      brand: response.data.brand,
      name: response.data.name,
      imageURL: response.data.imageURL,
      price: response.data.price,
      gigabytes: response.data.gigabytes,
      isFiveG: response.data.isFiveG,

    })

    handleShowModal()
  }



  useEffect(() => {
    loadTableWithData()
  }, [])


  async function loadTableWithData(){
    const response = await api.get('/products')
    // console.log(response)
    setAllProducts(response.data)
  }


  const history = useHistory()

  function goHome(){
    history.push('/')
  }


  return (
    <div className="container manage-products">
        <br/>
        <h1>Lista de Produtos Cadastrados</h1>
        <br/>
        <div className="page-header">
          <Link to="/"><Button onClick={goHome} className="add-productBtn" variant="warning">Voltar para Home</Button></Link>
        </div>
        <br/>
        <Table className="text-center" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Produto</th>
              <th>Pre??o</th>
              <th>Armazenamento</th>
              <th>Tecnologia 5G</th>
              <th>Op????es</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(product => (
              <>
              <tr key={product.id}>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
                <td>{product.gigabytes} GB</td>
                <td>
                  <Badge variant={ product.isFiveG === "Suporta" ? "success" : "secondary"}>
                    { product.isFiveG === "Suporta" ? "Suporta" : "N??o Suporta"}</Badge>
                </td>
                <td>
                  <Button onClick={() => loadOneProduct(product.id)} className="mr-2" size="sm" variant="info">Ver</Button>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                      <Modal.Title>{productModel.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <img className="modal-image" src={productModel.imageURL}/>
                      <h2>{productModel.brand}</h2>
                      <h2>R$ {productModel.price}</h2>
                      <Badge variant={ productModel.isFiveG === "Suporta" ? "success" : "secondary"}>
                        { productModel.isFiveG === "Suporta" ? "Suporta 5G" : "N??o Suporta 5G"}</Badge>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant="primary" onClick={handleCloseModal}>Ok</Button>
                    </Modal.Footer>
                  </Modal>
                </td>
            </tr>
            </>

            ))}
            
          </tbody>
        </Table>
      </div>
  )
}