const Todo = require('../models/todo')
const { param, body, validationResult } = require('express-validator/check')

const idValidator = () => {
  return [
    param('id')
      .isInt()
      .withMessage('O parâmetro é do tipo inteiro')
  ]
}

const todoValidator = () => {
  return [
    body('value')
      .not()
      .isEmpty()
      .withMessage('O campo é obrigatório'),
    body('value')
      .isLength({ min: 5 })
      .withMessage('O campo tem tamanho minímo de 5 caracteres')
  ]
}

const validators = (original, ...args) => {
  return original.concat(...args)
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
    const page = parseInt(request.query.page) || 1
    const pageSize = 10
    const offset = (page - 1) * pageSize
    const todos = await Todo().findAll({ limit: pageSize, offset: offset })
    response.json({
      'items': todos,
      'pagination': {
        'total': await Todo().count(),
        'pageSize': pageSize,
        'page': page
      }
    })
  })

  app.get('/v1/todo/:id', idValidator(), async function (request, response) {
    validate(request, response)
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

  app.put('/v1/todo/:id', validators(todoValidator(), idValidator()), async function (request, response) {
    validate(request, response)
    const todo = await loadEntity(request, response, Todo)
    todo.value = request.body.value
    await todo.save()
    response.json(todo)
  })

  app.delete('/v1/todo/:id', idValidator(), async function (request, response) {
    validate(request, response)
    const todo = await loadEntity(request, response, Todo)
    await todo.destroy()
    response.status(204).end()
  })
}
