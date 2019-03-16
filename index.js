const bootstrap = require('./core/bootstrap')
const useErrorMiddleware = require('./core/error')
const app = bootstrap()

app.listen(3000, () => {
  console.log('Servidor rodando...')
})

useErrorMiddleware(app)
