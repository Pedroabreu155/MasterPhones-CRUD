
const firebase = require('../dataBase')
const Product = require("../models/product")

const firestore = firebase.firestore()

const addNewProduct = async (request, response) => {

  try {
    const data = request.body
    await firestore.collection('products').doc().set(data)
    response.send("Seu registro foi salvo com sucesso!")
  } catch (error) {
    response.status(400).send(error.message)
  }

}

const getAllProducts = async (request, response) => {
  try {
    const products = await firestore.collection('products')
    const data = await products.get()
    const allproducts = []

    if(data.empty){
      response.status(404).send("Nenhum produto cadastrado!")
    } else{
      data.forEach(doc => {
        const product = new Product(
          doc.id,
          doc.data().name,
          doc.data().brand,
          doc.data().price,
          doc.data().gigabytes,
          doc.data().isFiveG
        )
        
        allproducts.push(product)
      })
      
      response.send(allproducts)
    }

  } catch (error) {
    response.status(400).send(error.message)
  }
}

const getOneProduct = async (request, response) => {
  try {
    const id = request.params.id
    const product = await firestore.collection('products').doc(id)
    const data = await product.get()

    if(!data.exists){
      response.status(404).send("Produto não encontrado ou ID inválido!")
    } else{
      response.send(data.data())
    }

  } catch (error) {
    response.status(400).send(error.message)
  }
}

const updateProduct = async (request, response) => {
  try {
    const id = request.params.id
    const data = request.body
    const product = await firestore.collection('products').doc(id)
    await product.update(data)

    response.send("Produto alterado com sucesso!")

  } catch (error) {
    response.status(400).send(error.message)
  }
}

const deleteProduct = async (request, response) => {
  try {
    const id = request.params.id
    await firestore.collection('products').doc(id).delete()

    response.send("Produto apagado com sucesso!")
  } catch (error) {
    response.status(400).send(error.message)
  }
}

module.exports = {
  addNewProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
}