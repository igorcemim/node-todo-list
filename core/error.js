module.exports = function (app) {
  app.use(function (error, request, response, next) {
    console.error(error.stack)
    response.status(500).json({
      'message': 'Error'
    })
  })
}
