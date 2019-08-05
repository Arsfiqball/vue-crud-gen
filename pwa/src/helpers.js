import store from '@/store'
import { format } from 'date-fns'

export function handleRequestError (error) {
  if (error.response && error.response.status === 422) {
    return store.dispatch('updateValidationErrors', error.response.data.errors)
  }

  return console.error(error)
}

export function formatDate (time) {
  return format(time, 'DD-MM-YYYY')
}

export default {
  handleRequestError,
  formatDate
}
