<template>
  <div class="field">
    <label class="label">
      {{ label }}
    </label>
    <div class="control">
      <slot/>
    </div>
    <p v-if="error" v-text="error" class="help is-danger"></p>
    <p v-if="help" v-text="help" class="help"></p>
  </div>
</template>

<script>
export default {
  name: 'form-field',

  props: {
    label: String,
    error: String,
    help: String
  }
}
</script>
