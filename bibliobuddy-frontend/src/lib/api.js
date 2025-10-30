import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const isNetwork = !!error.isAxiosError && !error.response
    const status = error.response?.status
    const detail = error.response?.data?.message || error.message
    error.prettyMessage = isNetwork
      ? 'Network error: backend unreachable'
      : status
      ? `Request failed (${status}): ${detail}`
      : detail
    return Promise.reject(error)
  }
)

export default api
