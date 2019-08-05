<template>
  <div id="app">
    <template v-if="isLoaded">
      <component :is="layout">
        <router-view/>
      </component>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import api from '@/api'
import { handleRequestError } from '@/helpers'

export default {
  data: () => ({
    isLoaded: false
  }),

  mounted () {
    // you can call server's API here,
    // and set isLoaded = true when it's done
    this.isLoaded = true
  },

  methods: {
  },

  computed: {
    layout () {
      return (this.$route.meta.layout || 'default-layout')
    }
  }
}
</script>
