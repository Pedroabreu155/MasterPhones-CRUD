import React, { useState, useEffect} from 'react'
import { Badge, Button, Table } from 'react-bootstrap'
import './ManageProducts.css'
import api from '../../services/api'


interface IProduct {
  id: string;
  brand: string;
  name: string;
  price: string;
  gigabytes: number;
  isFiveG: boolean;

}


export default function ManageProducts() {
                                                //typing the variable
  const [allProducts, setAllProducts] = useState<IProduct[]>([])


  useEffect(() => {
    loadTableWithData()
  }, [])


  async function loadTableWithData(){
    const response = await api.get('/products')
    // console.log(response)
    setAllProducts(response.data)
  }

  return (

      <div className="container manage-products">
        <br/>
        <h1>Gerenciar Produtos</h1>
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
                <td>{product.price}</td>
                <td>{product.gigabytes}</td>
                <td>
                  <Badge variant={ product.isFiveG ? "success" : "secondary"}>
                    { product.isFiveG ? "Suporta" : "Não Suporta"}</Badge>
                </td>
                <td>
                  <Button className="mr-2" size="sm" variant="info">Ver</Button>
                  <Button className="mr-2" size="sm" variant="warning">Editar</Button>
                  <Button className="mr-2" size="sm" variant="danger">Excluir</Button>
                </td>
            </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
  )
}
