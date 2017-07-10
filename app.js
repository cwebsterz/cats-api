const express = require('express')
const app = express()
const dal = require('./dal.js')
const port = process.env.PORT || 4000

app.get('/', (req, res, next) => {
  res.send('Welcome to the Cats API')
})

app.get('/cats', (req, res, next) => {})

app.use((err, req, res, next) => {
  console.log('method: ', req.method, ' path: ', req.path, ' error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log('this api is running on: ', port))
