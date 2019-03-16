module.exports = function (app) {
  app.get('/v1/ping', (request, response) => {
    response.json({
      'message': 'Pong!'
    })
  })
}
