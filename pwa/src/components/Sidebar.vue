<template>
  <div class="sidebar-wrapper">
    <div class="logo">
      <span>
        Web Admin
      </span>
    </div>
    <div class="sidebar-menu">
      <router-link to="/" class="sidebar-menu-item" exact-active-class="is-active">
        <span class="icon">
          <i class="fas fa-tv"></i>
        </span>
        <span>
          Dashboard
        </span>
      </router-link>
      <router-link to="/about" class="sidebar-menu-item" active-class="is-active">
        <span class="icon">
          <i class="fas fa-info"></i>
        </span>
        <span>
          About
        </span>
      </router-link>
      <router-link to="/example" class="sidebar-menu-item" active-class="is-active">
        <span class="icon">
          <i class="fas fa-link"></i>
        </span>
        <span>
          Example Link
        </span>
      </router-link>
    </div>
    <div class="sidebar-footer">
      <a @click="handleClickLogout" class="sidebar-menu-item" active-class="is-active">
        <span class="icon">
          <i class="fas fa-power-off"></i>
        </span>
        <span>
          Log Out
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'sidebar',

  data: () => ({
  }),

  methods: {
    handleClickLogout () {
      alert('LOG OUT')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;
}

.logo {
  display: block;
  font-weight: bold;
  padding: 1rem 1rem;
}

.sidebar-menu {
  flex-grow: 10;
  margin: 1rem 0;
}

.sidebar-menu .sidebar-menu-item, .sidebar-footer .sidebar-menu-item {
  display: block;
  color: #fff;
  padding: .5rem 1rem;
  border-left: 3px solid #2c3e50;
  background-color: inherit;
  transition: background-color .2s ease;
  outline: none;
}

.sidebar-menu-item.is-active, .sidebar-menu-item:hover {
  border-left: 3px solid #3498db;
  background-color: #1c2e40;
}

.sidebar-menu-item .icon {
  margin-right: .5rem;
}
</style>
