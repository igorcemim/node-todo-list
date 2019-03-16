module.exports = function (app) {
  app.get('/v1/todo', function (request, response) {
    response.json({
      'items': [
        {
          'value': 'lavar a louça'
        },
        {
          'value': 'comprar pão'
        },
        {
          'value': 'pagar as contas'
        }
      ]
    })
  })

  app.get('/v1/todo/:id', function (request, response) {
    response.json({
      'id': 1,
      'value': 'pagar as contas'
    })
  })

  app.post('/v1/todo', function (request, response) {
    console.log(request.body)
    response.json({
      'id': 1,
      'value': 'Foobar'
    })
  })

  app.put('/v1/todo/:id', function (request, response) {
    console.log(request.body)
    response.json({
      'id': 1,
      'value': 'Foobar'
    })
  })

  app.delete('/v1/todo/:id', function (request, response) {
    response.status(204).end()
  })
}
