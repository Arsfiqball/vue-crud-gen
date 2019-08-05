import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API || undefined,
  withCredentials: true, // set this to true, to enable Cookie in CORS
  timeout: 10000
})

export default api
