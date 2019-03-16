const Todo = require('../models/todo')
const { body } = require('express-validator/check')
const { idValidator, pageValidator, validate, validators } = require('../core/validation')

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

const loadEntity = async (request, response, model) => {
  const entity = await model().findByPk(request.params.id)
  if (!entity) {
    response.status(404).end()
  }
  return entity
}

const paginator = (model, page, pageSize = 10) => {
  return {
    paginate: async () => {
      const offset = (page - 1) * pageSize
      return model().findAll({ limit: pageSize, offset: offset })
    },
    info: async () => {
      return {
        'total': await model().count(),
        'pageSize': pageSize,
        'page': page
      }
    }
  }
}

module.exports = function (app) {
  app.get('/v1/todo', pageValidator(), async function (request, response) {
    validate(request, response)
    const page = parseInt(request.query.page) || 1
    const todoPaginator = paginator(Todo, page)
    const todos = await todoPaginator.paginate()
    response.json({
      'items': todos,
      'pagination': await todoPaginator.info()
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
