import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:3003', // API URL
  timeout: 5000,
})

// 請求攔截器
api.interceptors.request.use(config => {
  // 可加 token
  return config
})

// 回應攔截器
api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)

export default api
