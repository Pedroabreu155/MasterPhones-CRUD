import React, { useState, useEffect} from 'react'
import { Table, Badge, Button } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import api from '../../services/api'


interface IProduct {
  id: string;
  brand: string;
  name: string;
  price: string;
  gigabytes: number;
  isFiveG: string;

}

export default function ViewProducts() {

  const [allProducts, setAllProducts] = useState<IProduct[]>([])


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
                    { product.isFiveG === "Suporta" ? "Suporta" : "Não Suporta"}</Badge>
                </td>
                <td>
                  <Button className="mr-2" size="sm" variant="info">Ver</Button>
                </td>
            </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
  )
}