import { validate } from '../core/validation'

const throw404 = (response) => {
  return response.status(404).end()
}

const loadEntity = async (request, response, model) => {
  const entity = await model.findByPk(request.params.id)
  if (!entity) {
    return null
  }
  return entity
}

const paginator = (model, page, pageSize = 10) => {
  return {
    paginate: async () => {
      const offset = (page - 1) * pageSize
      return model.findAll({ limit: pageSize, offset: offset })
    },
    info: async () => {
      return {
        'total': await model.count(),
        'pageSize': pageSize,
        'page': page
      }
    }
  }
}

class CrudService {
  constructor (app, model) {
    this.app = app
    this.model = model
  }

  list (route, validators = []) {
    this.app.get(route, validators, async (request, response) => {
      validate(request, response)
      const page = parseInt(request.query.page) || 1
      const listPaginator = paginator(this.model, page)
      const items = await listPaginator.paginate()
      response.json({
        'items': items,
        'pagination': await listPaginator.info()
      })
    })
  }

  get (route, validators = []) {
    this.app.get(route, validators, async (request, response) => {
      validate(request, response)
      const item = await loadEntity(request, response, this.model)
      if (!item) return throw404(response)
      response.json(item)
    })
  }

  create (route, validators = []) {
    this.app.post(route, validators, async (request, response, next) => {
      validate(request, response)
      const item = await this.model.create({
        'value': request.body.value
      })
      response.status(201).json(item)
    })
  }

  update (route, validators = []) {
    this.app.put(route, validators, async (request, response) => {
      validate(request, response)
      const item = await loadEntity(request, response, this.model)
      if (!item) return throw404(response)
      item.value = request.body.value
      await item.save()
      response.json(item)
    })
  }

  delete (route, validators = []) {
    this.app.delete(route, validators, async (request, response) => {
      validate(request, response)
      const item = await loadEntity(request, response, this.model)
      if (!item) return throw404(response)
      await item.destroy()
      response.status(204).end()
    })
  }
}

export default CrudService
