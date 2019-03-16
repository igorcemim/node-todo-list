const orm = require('../core/orm')
const Sequelize = require('sequelize')

const Todo = orm.define('todo', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = function () {
  return Todo
}
