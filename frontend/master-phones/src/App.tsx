import React from 'react';

import Header from './components/Header'

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes/>
    </BrowserRouter>
  );
}

export default App;
