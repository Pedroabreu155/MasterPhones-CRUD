const express = require('express')

const { addNewProduct, getAllProducts, getOneProduct, 
          updateProduct, deleteProduct } = require('../controllers/productController')

const routes = express.Router()

routes.post("/new-product", addNewProduct)
routes.get("/products", getAllProducts)
routes.get("/product/:id", getOneProduct)
routes.put("/edit-product/:id", updateProduct)
routes.delete("/delete-product/:id", deleteProduct)


module.exports = {
  routes: routes
}