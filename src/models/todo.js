import Sequelize from 'sequelize'

module.exports = function (app) {
  const Todo = app.orm.define('todo', {
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
  return Todo
}
