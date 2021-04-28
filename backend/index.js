const express = require('express')
const cors = require('cors')
const configs = require('./config')

const port = configs.port


const app = express()

app.use(express.json())
app.use(cors())

app.listen(port, () => console.log(`Server is running on port: ${port}`))

app.get("/", (request, response) => {
  response.send("Hello World")
})


const productRoutes = require('./routes/product-routes')

app.use("/api", productRoutes.routes)
