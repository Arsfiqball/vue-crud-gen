const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const mustache = require('mustache')

async function generate () {
  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'folder',
    message: 'Enter the front-end client folder:',
    default: 'pwa'
  }, {
    type: 'input',
    name: 'folderApi',
    message: 'Enter the back-end client folder:',
    default: 'api'
  }, {
    type: 'input',
    name: 'name',
    message: 'Enter the name of component:',
    validate: input => !!input
  }, {
    type: 'input',
    name: 'table',
    message: 'Enter the table in database:',
    validate: input => !!input
  }, {
    type: 'input',
    name: 'fields',
    message: 'Enter list of field names separated by comma:',
    validate: input => !!input
  }, {
    type: 'input',
    name: 'primary',
    message: 'Enter the primary key:',
    validate: input => !!input
  }, {
    type: 'input',
    name: 'searchable',
    message: 'Enter list of searchable field separated by comma:',
    validate: input => !!input
  }])

  const folder = answers.folder
  const folderApi = answers.folderApi
  const filename = answers.name + '.vue'
  const filenameApi = answers.name.toLowerCase() + '.js'

  const templateVue = await fs.readFile(path.resolve(__dirname, 'templates/crud-vue.mst'), 'utf8')
  const templateApi = await fs.readFile(path.resolve(__dirname, 'templates/crud-api.mst'), 'utf8')
  const outputVuePath = path.resolve(process.cwd(), folder, 'src/views', filename)
  const outputApiPath = path.resolve(process.cwd(), folderApi, 'src/modules', filenameApi)

  await fs.outputFile(outputVuePath, mustache.render(templateVue, {
    name: answers.name,
    nameLower: answers.name.toLowerCase(),
    tableName: answers.table,
    apiPath: '/' + answers.name.toLowerCase(),
    primary: answers.primary,
    fields: answers.fields.split(',').map(r => r.trim()).map(r => ({
      key: r,
      label: r
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }))
  }, {}, ['<%', '%>']))

  console.log(`Generated: ${outputVuePath}`)

  const searchable = answers.searchable.split(',').map(r => r.trim())

  await fs.outputFile(outputApiPath, mustache.render(templateApi, {
    name: answers.name,
    tableName: answers.table,
    nameLower: answers.name.toLowerCase(),
    apiPath: '/' + answers.name.toLowerCase(),
    primary: answers.primary,
    searchable: answers.searchable.split(',').map(r => r.trim()),
    whereLike: searchable[0],
    orWhereLike: searchable.slice(1),
    fields: answers.fields.split(',').map(r => r.trim()).map(r => ({
      key: r,
      label: r
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }))
  }, {}, ['<%', '%>']))

  console.log(`Generated: ${outputApiPath}`)
}

generate().then(() => console.log('DONE!'))
