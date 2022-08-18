const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send({ message: 'Hello World2!' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})