import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Web Admin',
    isSidebarActive: false,
    validationErrors: {}
  },

  mutations: {
    SET_TITLE (state, title) {
      state.title = title
    },

    SET_VALIDATION_ERRORS (state, errors) {
      state.validationErrors = errors
    },

    SET_SIDEBAR_ACTIVE (state, isActive) {
      state.isSidebarActive = isActive
    }
  },

  actions: {
    setTitle (ctx, title) {
      window.title = title
      ctx.commit('SET_TITLE', title)
    },

    toggleSidebar (ctx) {
      ctx.commit('SET_SIDEBAR_ACTIVE', !ctx.state.isSidebarActive)
    },

    setSidebar (ctx, isActive) {
      ctx.commit('SET_SIDEBAR_ACTIVE', isActive)
    },

    updateValidationErrors (ctx, errors) {
      ctx.commit('SET_VALIDATION_ERRORS', errors)
    },

    resetValidationErrors (ctx) {
      ctx.commit('SET_VALIDATION_ERRORS', {})
    }
  }
})
