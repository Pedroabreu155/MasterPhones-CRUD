const express = require('express')

const { addNewProduct } = require('../controllers/productController')

const routes = express.Router()

routes.post("/product", addNewProduct)

module.exports = {
  routes: routes
}