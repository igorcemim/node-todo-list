import TodoService from '../services/todo'
import { body } from 'express-validator/check'
import { idValidator, pageValidator, validators } from '../core/validation'

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

module.exports = function (app) {
  const todoService = new TodoService(app)
  todoService.list('/v1/todo', pageValidator())
  todoService.get('/v1/todo/:id', idValidator())
  todoService.create('/v1/todo', todoValidator())
  todoService.update('/v1/todo/:id', validators(todoValidator(), idValidator()))
  todoService.delete('/v1/todo/:id', idValidator())
}
