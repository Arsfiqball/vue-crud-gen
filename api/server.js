require('dotenv').config()

const main = require('./src/main')

const PORT = process.env.APP_PORT || 3000
const HOST = process.env.APP_HOST || '0.0.0.0'

main().then(app => app.listen(PORT, HOST))
