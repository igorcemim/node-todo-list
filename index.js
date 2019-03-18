import bootstrap from './src/core/bootstrap'
import useErrorMiddleware from './src/core/error'

const app = bootstrap()

app.listen(3000, () => {
  console.log('Servidor rodando...')
})

useErrorMiddleware(app)
