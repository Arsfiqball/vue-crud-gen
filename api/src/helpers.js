const _ = require('lodash')

function wrap (fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(err => {
      if (err instanceof ValidationErrors) {
        return res
          .status(422)
          .json({ errors: _.mapValues(err.errors, r => r[0] || null) })
      }

      next(err)
    })
  }
}

function ValidationErrors (errors, options, attributes, constraints) {
  Error.captureStackTrace(this, this.constructor)
  this.errors = errors
  this.options = options
  this.attributes = attributes
  this.constraints = constraints
}

ValidationErrors.prototype = new Error()

module.exports = {
  wrap,
  ValidationErrors
}
