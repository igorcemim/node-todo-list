const server = require('./app-http/server')
const useErrorMiddleware = require('./app-http/error')
const app = server()

app.listen(3000, () => {
  console.log('Servidor rodando...')
})

useErrorMiddleware(app)
