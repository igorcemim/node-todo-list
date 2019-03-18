import dotenv from 'dotenv'
import express from 'express'
import consign from 'consign'
import bodyParser from 'body-parser'
import orm from './orm'

module.exports = () => {
  dotenv.config()

  const app = express()
  app.use(bodyParser.json())
  app.orm = orm()

  consign({ verbose: false })
    .include('src/controllers')
    .include('src/models')
    .into(app)

  return app
}
