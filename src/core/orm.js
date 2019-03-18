const Sequelize = require('sequelize')
require('dotenv').config()

if (!process.env.DATABASE_URI) {
  throw new Error('O parâmetro DATABASE_URI não está configurado no .env')
}

const sequelize = new Sequelize(process.env.DATABASE_URI)

module.exports = sequelize
