import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import ViewProducts from './pages/ViewProducts'

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/produtos" component={ViewProducts}/>
      </Switch>
    </div>
  )
}
