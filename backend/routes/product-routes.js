const express = require('express')

const { addNewProduct, getAllProducts, getOneProduct } = require('../controllers/productController')

const routes = express.Router()

routes.post("/new-product", addNewProduct)
routes.get("/products", getAllProducts)
routes.get("/product/:id", getOneProduct)


module.exports = {
  routes: routes
}