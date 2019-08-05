<template>
  <nav class="navbar is-dark is-hidden-tablet" id="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <span class="icon">
          <i class="fas fa-home"></i>
        </span>
        <span></span>
      </router-link>
      <span class="navbar-item" v-text="title"></span>
      <a @click="handleBurgerClick" :class="['navbar-burger', isActive ? 'is-active' : null]">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'mobile-navbar',

  data: () => ({
  }),

  methods: {
    handleBurgerClick () {
      return this.$store.dispatch('toggleSidebar')
    }
  },

  computed: {
    isActive () {
      return this.$store.state.isSidebarActive
    },

    title () {
      return this.$store.state.title
    }
  }
}
</script>

<style lang="scss">
#navbar {
  background: #2c3e50;
}
</style>
