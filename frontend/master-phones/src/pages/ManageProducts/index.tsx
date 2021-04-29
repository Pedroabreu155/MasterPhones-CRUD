import React, { useState, useEffect} from 'react'
import { Badge, Button, Modal, Table } from 'react-bootstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import './ManageProducts.css'
import api from '../../services/api'


interface IProduct {
  id: string;
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


export default function ManageProducts() {
                                                //typing the variable
  const [allProducts, setAllProducts] = useState<IProduct[]>([])

  const [showViewerModal, setShowViewerModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [productModel, setProductModel] = useState<IProduct>({
    id: '',
    brand: '',
    name: '',
    imageURL: '',
    price: '',
    gigabytes: 0,
    isFiveG: 'Suporta'
  })

  const history = useHistory()

  const { id } = useParams<IParams>()

  useEffect(() => {
    loadTableWithData()
  }, [])

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

    handleShowViewerModal()
  }


  function handleCloseViewerModal(){
    setShowViewerModal(false)
  }

  function handleShowViewerModal(){
    setShowViewerModal(true)

  }

  function handleCloseDeleteModal(){
    setShowDeleteModal(false)
  }

  function handleShowDeleteModal(id: string){
    const idToBeDeleted = id
    setShowDeleteModal(true)

    return idToBeDeleted
  }

  async function loadTableWithData(){
    const response = await api.get('/products')
    // console.log(response)
    setAllProducts(response.data)
  }


  async function deleteProduct(){

  }


  function newProduct(){
    history.push('/new-product')
  }

  function editProduct(id: string){
    // console.log(id)
    history.push(`/edit-product/${id}`)
  }

  return (

      <div className="container manage-products">
        <br/>
        <h1>Painel de Gerenciamento</h1>
        <br/>
        <div className="page-header">
          <Button onClick={newProduct} className="add-productBtn" variant="warning">Adicionar Produto</Button>
          <Link to="/"><Button onClick={newProduct} className="add-productBtn" variant="secondary">Voltar para Home</Button></Link>
        </div>
        <br/>
        
        <Table className="text-center" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Armazenamento</th>
              <th>Tecnologia 5G</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(product => (
              <tr key={product.id}>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
                <td>{product.gigabytes} GB</td>
                <td>
                  <Badge variant={ product.isFiveG === "Suporta" ? "success" : "secondary"}>
                    { product.isFiveG == "Suporta" ? "Suporta" : "Não Suporta"}</Badge>
                </td>
                <td>
                  <Button onClick={() => loadOneProduct(product.id)} className="mr-2" size="sm" variant="info">Ver</Button>
                  <Modal show={showViewerModal} onHide={handleCloseViewerModal}>
                    <Modal.Header>
                      <Modal.Title>{productModel.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <img className="modal-image" src={productModel.imageURL}/>
                      <h2>{productModel.brand}</h2>
                      <h2>R$ {productModel.price}</h2>
                      <Badge variant={ productModel.isFiveG === "Suporta" ? "success" : "secondary"}>
                        { productModel.isFiveG === "Suporta" ? "Suporta 5G" : "Não Suporta 5G"}</Badge>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant="primary" onClick={handleCloseViewerModal}>Ok</Button>
                    </Modal.Footer>
                  </Modal>
                  
                  <Button onClick={() => editProduct(product.id)} className="mr-2" size="sm" variant="warning">Editar</Button>
                  <Button onClick={() => handleShowDeleteModal(product.id)} className="mr-2" size="sm" variant="danger">Excluir</Button>
                </td>
            </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
  )
}
