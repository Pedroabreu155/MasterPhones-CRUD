import React, { useState, useEffect} from 'react'
import { Badge, Button, Table } from 'react-bootstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import './ManageProducts.css'
import api from '../../services/api'


interface IProduct {
  id: string;
  brand: string;
  name: string;
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

  const history = useHistory()

  const { id } = useParams<IParams>()

  useEffect(() => {
    loadTableWithData()
  }, [])

  async function loadTableWithData(){
    const response = await api.get('/products')
    // console.log(response)
    setAllProducts(response.data)
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
              <th>ID</th>
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
                <td>{product.id}</td>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
                <td>{product.gigabytes} GB</td>
                <td>
                  <Badge variant={ product.isFiveG === "Suporta" ? "success" : "secondary"}>
                    { product.isFiveG == "Suporta" ? "Suporta" : "Não Suporta"}</Badge>
                </td>
                <td>
                  <Button className="mr-2" size="sm" variant="info">Ver</Button>
                  <Button onClick={() => editProduct(product.id)} className="mr-2" size="sm" variant="warning">Editar</Button>
                  <Button className="mr-2" size="sm" variant="danger">Excluir</Button>
                </td>
            </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
  )
}
