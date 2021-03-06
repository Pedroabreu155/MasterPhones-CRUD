import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import ViewProducts from './pages/ViewProducts'
import ManageProducts from './pages/ManageProducts'
import NewProduct from './pages/ManageProducts/NewProduct'
import EditProduct from './pages/ManageProducts/EditProduct'

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/produtos" exact component={ViewProducts}/>
        <Route path="/gerenciar" exact component={ManageProducts}/>
        <Route path="/new-product" exact component={NewProduct}/>
        <Route path="/edit-product/:id" exact component={EditProduct}/>
      </Switch>
    </div>
  )
}
