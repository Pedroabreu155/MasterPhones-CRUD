const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const configs = require('./config')

const port = configs.port


const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.get("/", (request, response) => {
  response.send("Hello World")
})

app.listen(port, () => console.log(`Server is running on port: ${port}`))

