const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const knex = require('knex')
const validate = require('validate.js')
const assert = require('assert')

const MySQLStore = require('express-mysql-session')(session)

const ValidationErrors = require('./helpers').ValidationErrors

const whitelist = [
  process.env.FRONT_END_HOST || 'http://localhost:8080'
]

validate.async.options = {
  wrapErrors: ValidationErrors
}

validate.validators.unique = function (value, options, key, attributes) {
  assert.ok(!!options.table)
  assert.ok(!!options.column)
  assert.ok(!!options.db)

  return options
    .db(options.table)
    .where(options.column, value)
    .first(options.column)
    .then(row => Promise.resolve(row ? `${key} is already used` : undefined))
    .catch(console.error)
}

module.exports = async function () {
  const db = knex(require('../knexfile'))
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser('n0ts3cure'))
  app.use(cors({
    credentials: true,
    preflightContinue: true,
    origin: whitelist
  }))

  app.use(session({
    secret: process.env.SESSION_SECRET || 'n0ts3cure',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false },
    store: new MySQLStore({
      host: process.env.MYSQL_HOSTNAME || 'localhost',
      port: 3306,
      user: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'elings_ar'
    })
  }))

  app.use((req, res, next) => {
    req.db = db
    next()
  })

  // =======
  // MODULES
  // =======

  await require('./modules/penduduk')(app, db)

  return app
}
