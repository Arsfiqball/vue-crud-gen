<template>
  <div>
    <div :class="['sidebar', isSidebarActive ? 'is-active' : null]">
      <Sidebar />
    </div>
    <div class="main">
      <MobileNavbar />
      <slot />
    </div>
  </div>
</template>

<script>
import MobileNavbar from '@/components/MobileNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { isAuth } from '@/helpers'

export default {
  name: 'default-layout',

  components: {
    MobileNavbar,
    Sidebar
  },

  methods: {
  },

  mounted () {
    // do something here if needed
  },

  watch: {
    $route () {
      return this.$store.dispatch('setSidebar', false)
    }
  },

  computed: {
    isSidebarActive () {
      return this.$store.state.isSidebarActive
    } 
  }
}
</script>

<style lang="scss">
.sidebar {
  display: flex;
  position: fixed;
  background: #2c3e50;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  overflow-y: auto;
}

.main {
  display: block;
  margin-left: 240px;
}

@media screen and (max-width: 768px) {
  .main {
    margin-left: 0;
  }

  .sidebar {
    z-index: 999;
    transform: translateX(-240px);
    transition: transform .3s ease;
  }

  .sidebar.is-active {
    transform: translateX(0px);
  }
}
</style>
