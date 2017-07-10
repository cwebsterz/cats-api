const express = require('express')
const app = express()
const dal = require('./dal.js')
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')

app.get('/', (req, res, next) => {
  res.send('Welcome to the Cats API')
})

app.get('/cats', (req, res, next) => {
  dal.listCats(function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(data)
  })
})

app.get('/cats/:id', (req, res, next) => {
  dal.showCat(Number(req.params.id), function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))

    console.log('data: ', JSON.stringify(data, null, 2))

    if (data) {
      res.status(200).send(data)
    } else {
      next(new HTTPError(404, 'Not Found', { path: req.path }))
    }
  })
})

app.use((err, req, res, next) => {
  console.log('method: ', req.method, ' path: ', req.path, ' error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log('this api is running on: ', port))
