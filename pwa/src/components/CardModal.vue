<template>
  <div>
    <div :class="['modal', isActive ? 'is-active' : null]">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ title }}
            </p>
            <a class="card-header-icon" @click="$emit('close')">
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <slot/>
          </div>
          <footer class="card-footer">
            <a
              class="card-footer-item"
              v-for="action in transformedActions"
              v-text="action.capitalized"
              @click="$emit(action.lowercased)"
            />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-modal',

  props: {
    title: String,
    actions: Array,
    isActive: Boolean
  },

  computed: {
    transformedActions () {
      return this.actions.map(t => ({
        name: t,
        lowercased: t.toString().toLowerCase(),
        capitalized: t
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }))
    }
  }
}
</script>
