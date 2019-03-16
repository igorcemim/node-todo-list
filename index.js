const bootstrap = require('./src/core/bootstrap')
const useErrorMiddleware = require('./src/core/error')
const app = bootstrap()

app.listen(3000, () => {
  console.log('Servidor rodando...')
})

useErrorMiddleware(app)
