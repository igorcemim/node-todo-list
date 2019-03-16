const { param, query, validationResult } = require('express-validator/check')

const idValidator = () => {
  return [
    param('id')
      .isUUID()
      .withMessage('O parâmetro é do tipo UUID')
  ]
}

const pageValidator = () => {
  return [
    query('page')
      .isInt()
      .withMessage('O parâmetro é do tipo inteiro')
  ]
}

const validators = (original, ...args) => {
  return original.concat(...args)
}

const validate = (request, response) => {
  const result = validationResult(request)
  if (!result.isEmpty()) {
    response.status(400).json({
      'errors': result.array()
    })
  }
}

module.exports = {
  validate: validate,
  validators: validators,
  pageValidator: pageValidator,
  idValidator: idValidator
}
