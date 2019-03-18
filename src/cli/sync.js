#!/usr/bin/env node
import bootstrap from '../core/bootstrap'

const app = bootstrap()

app.orm
  .sync()
  .then(() => process.exit(0))
