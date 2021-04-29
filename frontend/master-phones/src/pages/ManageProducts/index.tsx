import React, { useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'
import './ManageProducts.css'

import api from '../../services/api'

export default function ManageProducts() {

  useEffect(() => {
    loadTableWithData()
  }, [])


  async function loadTableWithData(){

    const response = await api.get('/products')
    console.log(response)

  }

  return (

      <div className="container manage-products">
        <br/>
        <h1>Gerenciar Produtos</h1>
        <br/>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Armazenamento</th>
              <th>Tecnologia 5G</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Apple</td>
              <td>Iphone 8</td>
              <td>3000</td>
              <td>64</td>
              <td>Suporta</td>
            </tr>
            <tr>
              <td>Motorola</td>
              <td>Moto G9</td>
              <td>1650</td>
              <td>128</td>
              <td>Não Suporta</td>
            </tr>
            <tr>
              <td>Xiaomi</td>
              <td>Redmi Note 10</td>
              <td>2000</td>
              <td>256</td>
              <td>Suporta</td>
            </tr>
          </tbody>
        </Table>
      </div>
  )
}
