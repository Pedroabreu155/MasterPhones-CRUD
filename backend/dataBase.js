const firebase = require('firebase')
const configs = require('./config')

const db = firebase.initializeApp(configs.firebaseConfig)

module.exports = db