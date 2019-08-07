# Requirements

* [Node.js](https://nodejs.org) (v10+ recommended)
* [NPM](https://nodejs.org)
* [Yarn](https://yarnpkg.com)
* [Degit](https://github.com/Rich-Harris/degit)

# Installation

Clone this repo using Degit and then install each module dependencies.

```sh
degit arsfiqball/vue-crud-gen vcgexample
cd vcgexample
cd gen
npm install
cd ../api
npm install
cp .env.example .env
cd ../pwa
yarn
cp .env.example .env.local
```

# Usage

Call the following command:
```sh
node gen/crud
```

Then, answer prompted questions:
```sh
? Enter the front-end client folder: pwa
? Enter the name of component: User
? Enter list of field names separated by comma: name, username, password, email
? Enter the primary key: id
Generated: ***/User.vue
Generated: ***/user.js
DONE!
```

# How to

### Add Route

Go to `./pwa/src/router.js` and add your component route to attribute `routes` like this:

```js
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue')
  }, {
    path: '/user', // route path
    name: 'user', // name to call in router-link
    component: () => import('./views/User.vue') // module generated
  }]
})
```

### Add Custom Layout

Create new vue component in folder `./pwa/src/layouts`, and don't forget to add slot. Example:
```html
<template>
  <!-- Simple.vue -->
  <div>
    <slot/>
  </div>
</template>
```

And then register that component in `./pwa/src/router.js` like this:
```js
import SimpleLayout from './layouts/Simple.vue'

//...

Vue.component('simple-layout', SimpleLayout)
```

Now you can use it in view component's route using `layout` attribute in meta like this:

```js
{
  path: '/user',
  name: 'user',
  component: () => import('./views/User.vue'),
  meta: { layout: 'simple-layout' }
}
```

### Add Link to Dashboard Sidebar

Open file `./pwa/src/components/Sidebar.vue` and add route link as child component of class `sidebar-menu`

```html
  <router-link to="/user" class="sidebar-menu-item" active-class="is-active">
    <span class="icon">
      <i class="fas fa-user"></i>
    </span>
    <span>
      User Accounts
    </span>
  </router-link>
```

### Load Data From Server Before Showing View

Open file `/pwa/src/App.vue`, do something inside mounted hooks and set isLoaded to true when it's done. Example:

```js
mounted () {
  api
    .get('/me')
    .then(({ data }) => this.$store.commit('SET_USER', data))
    .catch(handleRequestError)
    .finally(() => (this.isLoaded = true))
}
```

### Show Only Certain Data in TableData

Open your generated module (e.g `User.vue`) and remove unused field from `schema`

### Show Some More Data in DetailData

Open your generated module (e.g `User.vue`) and add more field to `detailSchema` with the same attribute like `schema` has

### Hide a Field From TableData on Mobile

Open your generated module (e.g `User.vue`) and add `hideMobile` option set to true in particular field to `schema`. Example:

```js
{
  key: 'username',
  label: 'User Name',
  hideMobile: true
}
```

### Transform a Field Value Before Showing It

Open your generated module (e.g `User.vue`) and pass a function to `transform` option in particular field to `schema`. Example:

```js
{
  key: 'username',
  label: 'User Name',
  transform: i => i.trim()
}
```

### Add Generated Back-End Module to Main.js

Import module to main.js and call it with appropriate dependencies (app, db) example:

```js
  // =======
  // MODULES
  // =======

  await require('./modules/user.js')(app, db)
```

### Setting Validation Constraints

Open your generated back-end module (e.g in `./api/src/modules/user.js`) and set `constraints` object with **Validate.js** format.

### Validate Unique Value

Open your generated back-end module (e.g in `./api/src/modules/user.js`) and set constraint option with `unique` attribute. Example:

```js
const constraints = {
  username: {
    unique: {
      table: 'users',
      column: 'username',
      db: db // instance of knex js
    }
  }
}
```
