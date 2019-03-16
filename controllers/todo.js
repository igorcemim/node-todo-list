const Todo = require('../models/todo')
const { check, validationResult } = require('express-validator/check')

const todoValidator = () => {
  return [
    check('value')
      .not()
      .isEmpty()
      .withMessage('O campo é obrigatório'),
    check('value')
      .isLength({ min: 5 })
      .withMessage('O campo tem tamanho minímo de 5 caracteres')
  ]
}

const loadEntity = async (request, response, model) => {
  const entity = await model().findByPk(request.params.id)
  if (!entity) {
    response.status(404).end()
  }
  return entity
}

const validate = (request, response) => {
  const result = validationResult(request)
  if (!result.isEmpty()) {
    response.status(400).json({
      'errors': result.array()
    })
  }
}

module.exports = function (app) {
  app.get('/v1/todo', async function (request, response) {
    const todos = await Todo().findAll()
    response.json({
      'items': todos
    })
  })

  app.get('/v1/todo/:id', async function (request, response) {
    const todo = await loadEntity(request, response, Todo)
    response.json(todo)
  })

  app.post('/v1/todo', todoValidator(), async function (request, response, next) {
    validate(request, response)
    const todo = await Todo().create({
      'value': request.body.value
    })
    response.status(201).json(todo)
  })

  app.put('/v1/todo/:id', todoValidator(), async function (request, response) {
    validate(request, response)
    const todo = await loadEntity(request, response, Todo)
    todo.value = request.body.value
    await todo.save()
    response.json(todo)
  })

  app.delete('/v1/todo/:id', async function (request, response) {
    const todo = await loadEntity(request, response, Todo)
    await todo.destroy()
    response.status(204).end()
  })
}
