
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

module.exports = {
  addNewProduct
}