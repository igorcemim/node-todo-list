module.exports = function (app) {
  app.get('/ping', (request, response) => {
    response.json({
      'message': 'Pong!'
    })
  })
}
