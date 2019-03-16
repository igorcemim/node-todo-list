import orm from '../core/orm'
import Sequelize from 'sequelize'

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
