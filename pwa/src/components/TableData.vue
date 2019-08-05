<template>
  <div>
    <table class="table is-fullwidth is-hoverable is-size-7">
      <thead>
        <tr>
          <th>
            <input ref="mass-check" type="checkbox" class="checkbox" @click="handleMassCheck">
          </th>
          <th v-for="e in schema" :class="[e.hideMobile ? 'is-hidden-mobile' : null]">
            <span>
              {{ e.label }}
            </span>
          </th>
          <th class="action-buttons"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td>
            <input
              class="checkbox"
              type="checkbox"
              v-model="checked"
              :value="item[primary]"
            />
          </td>
          <td v-for="e in schema" :class="[e.hideMobile ? 'is-hidden-mobile' : null]">
            <span v-text="e.transform ? e.transform(item[e.key]) : item[e.key]"></span>
          </td>
          <td class="has-text-centered">
            <div class="dropdown is-right is-hoverable">
              <div class="dropdown-trigger">
                <a class="button">
                  <span class="icon is-small">
                    <i class="fas fa-ellipsis-h"></i>
                  </span>
                </a>
              </div>
              <div class="dropdown-menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="$emit('show', item[primary])">
                    <span class="icon is-small">
                      <i class="fas fa-sticky-note"></i>
                    </span>
                    <span>
                      Show Details
                    </span>
                  </a>
                  <a class="dropdown-item" @click="$emit('edit', item[primary])">
                    <span class="icon is-small">
                      <i class="fas fa-pencil-alt"></i>
                    </span>
                    <span>
                      Edit
                    </span>
                  </a>
                  <a class="dropdown-item" @click="$emit('remove', [item[primary]])">
                    <span class="icon is-small">
                      <i class="fas fa-trash"></i>
                    </span>
                    <span>
                      Remove
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="checked.length">
          <td></td>
          <td :colspan="schema.length" class="is-hidden-mobile">
            <span>
              {{checked.length}} Selected
            </span>
          </td>
          <td :colspan="schema.filter(r => !r.hideMobile).length" class="is-hidden-tablet">
            <span>
              {{checked.length}} Selected
            </span>
          </td>
          <td class="has-text-centered">
            <div class="dropdown is-right is-hoverable">
              <div class="dropdown-trigger">
                <a class="button">
                  <span class="icon is-small">
                    <i class="fas fa-ellipsis-h"></i>
                  </span>
                </a>
              </div>
              <div class="dropdown-menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="handleMassRemove">
                    <span class="icon is-small">
                      <i class="fas fa-trash"></i>
                    </span>
                    <span>
                      Remove
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'table-data',

  props: {
    schema: Array,
    items: Array,
    primary: {
      type: String,
      default: () => 'id'
    }
  },

  data: () => ({
    checked: []
  }),

  methods: {
    handleMassCheck ($e) {
      if ($e.target.checked) {
        this.checked = this.items.map(r => r[this.primary])
      } else {
        this.checked = []
      }
    },

    handleMassRemove () {
      this.$emit('remove', this.checked)
      this.checked = []
      this.$refs['mass-check'].checked = null
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  td, th {
    vertical-align: middle;
  }
}

.button.is-action {
  border-radius: 20px;
}

.action-buttons {
  width: 100px;
}

@media screen and (max-width: 768px) {
  .action-buttons {
    width: 60px;
  }
}

.checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  position: relative;
  background-color: #ddd;
  color: #666;
  top: 2px;
  height: 20px;
  width: 20px;
  border: 0;
  cursor: pointer;  
  outline: none;
  border-radius: 3px;

  &:checked::before {
    position: absolute;
    font: 14px/1 'Open Sans', sans-serif;
    left: 6px;
    top: 2px;
    content: 'L';
    transform: rotate(40deg) scaleX(-1);
  }

  &:hover {
    background-color: #ccc;
  }

  &:checked {
    background-color: #eee;
  }
}
</style>
