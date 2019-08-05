import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Default from './layouts/Default.vue'

Vue.use(Router)

// this is the default layout,
// don't ever rename this layout to anything else
Vue.component('default-layout', Default)

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
  }]
})
