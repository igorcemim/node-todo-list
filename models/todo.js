const orm = require('../core/orm')
const Sequelize = require('sequelize')

const Todo = orm.define('todo', {
  value: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = function () {
  return Todo
}
