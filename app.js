const express = require('express')
const app = express()
const dal = require('./dal.js')
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.send('Welcome to the Cats API')
})

//Create new cat - Create - POST

app.post('/cats', (req, res, next) => {
  console.log('POST /cats, req.body: ', req.body)

  dal.add(req.body, (err, data) => {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(201).send(data)
  })
})

//Get a single cat - Read - GET

app.get('/cats/:id', (req, res, next) => {
  dal.showCat(Number(req.params.id), function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    if (data) {
      res.status(200).send(data)
    } else {
      next(new HTTPError(404, 'Not Found', { path: req.path }))
    }
  })
})

//Update a cat - Update - PUT

app.put('/cats/:id', (req, res, next) => {
  const catId = req.params.id
  dal.updateCat(Number(catId), req.body, function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(data)
  })
})

//Delete a cat - Delete - DELETE

app.delete('/cats/:id', (req, res, next) => {
  const catId = req.params.id
  dal.updateCat(Number(catId), function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(data)
  })
})

// Get all cats - List - GET

app.get('/cats', (req, res, next) => {
  dal.listCats(function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(data)
  })
})

app.use((err, req, res, next) => {
  console.log('method: ', req.method, ' path: ', req.path, ' error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log('this api is running on: ', port))
