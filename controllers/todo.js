const Todo = require('../models/todo')

module.exports = function (app) {
  app.get('/v1/todo', async function (request, response) {
    const todos = await Todo().findAll()
    response.json({
      'items': todos
    })
  })

  app.get('/v1/todo/:id', async function (request, response) {
    const todo = await Todo().findByPk(request.params.id)
    if (!todo) {
      response.status(404).end()
    }
    response.json(todo)
  })

  app.post('/v1/todo', async function (request, response) {
    const todo = await Todo().create({
      'value': request.body.value
    })
    response.json(todo)
  })

  app.put('/v1/todo/:id', async function (request, response) {
    const todo = await Todo().findByPk(request.params.id)
    if (!todo) {
      response.status(404).end()
    }
    todo.value = request.body.value
    await todo.save()
    response.json(todo)
  })

  app.delete('/v1/todo/:id', async function (request, response) {
    const todo = await Todo().findByPk(request.params.id)
    if (!todo) {
      response.status(404).end()
    }
    await todo.destroy()
    response.status(204).end()
  })
}
