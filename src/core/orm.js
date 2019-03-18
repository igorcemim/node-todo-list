const Sequelize = require('sequelize')

module.exports = function () {
  if (!process.env.DATABASE_URI) {
    throw new Error('O parâmetro DATABASE_URI não está configurado no .env')
  }

  return new Sequelize(process.env.DATABASE_URI)
}
