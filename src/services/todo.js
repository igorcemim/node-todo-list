import CrudService from '../services/crud'
import Todo from '../models/todo'

class TodoService extends CrudService {
  constructor (app) {
    super(app, Todo(app))
  }
}

export default TodoService
