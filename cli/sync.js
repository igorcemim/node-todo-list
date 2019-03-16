#!/usr/bin/env node
const orm = require('../core/orm')
const bootstrap = require('../core/bootstrap')

bootstrap()
orm.sync().then(() => process.exit(0))
