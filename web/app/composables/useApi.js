// composables/useApi.js
import axios from 'axios'

export const useApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:3003'
  })

  // 請求攔截器
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // 回應攔截器
  api.interceptors.response.use(
    res => res,
    err => {
      console.error('API Error:', err)
      return Promise.reject(err)
    }
  )

  return api
}
