<template>
  <div>
    <table class="table is-fullwidth is-size-7-mobile">
      <tbody>
        <tr v-for="e in schema">
          <td class="label-column">
            <span>{{ e.label }}</span>
          </td>
          <td>
            <span v-text="e.transform ? e.transform(item[e.key]) : item[e.key]"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'detail-data',

  props: {
    schema: Array,
    item: Object
  }
}
</script>

<style lang="scss" scoped>
.label-column {
  max-width: 120px;
}
</style>
