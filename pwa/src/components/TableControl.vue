<template>
  <div>
    <div class="field is-grouped">
      <div class="control">
        <a :class="['button', isLoading ? 'is-loading' : null]" @click="$emit('sync')">
          <span class="icon">
            <i class="fas fa-sync-alt"></i>
          </span>
        </a>
      </div>
      <div class="control is-expanded has-icons-right">
        <form @submit.prevent="$emit('search', query)">
          <input
            type="text"
            class="input is-shadowless"
            v-model="query"
            placeholder="Search keyword..."
          />
          <span class="icon is-small is-right">
            <i class="fas fa-search"></i>
          </span>
        </form>
      </div>
      <div class="control">
        <a class="button" @click="$emit('create')">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
        </a>
      </div>
      <div class="control">
        <div class="buttons has-addons">
          <a class="button" @click="$emit('prev-page')">
            <span class="icon">
              <i class="fas fa-chevron-left"></i>
            </span>
          </a>
          <a class="button">
            <span v-text="currentPage"></span>
          </a>
          <a class="button" @click="$emit('next-page')">
            <span class="icon">
              <i class="fas fa-chevron-right"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-control',

  props: {
    isLoading: Boolean,
    currentPage: [Number, String]
  },

  data: () => ({
    query: ''
  })
}
</script>

<style lang="scss" scoped>
.field {
  padding: .5rem;
}
</style>
