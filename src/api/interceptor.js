import axios from 'axios'

export default class {
  enableInterceptor () {
    axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    }, err => Promise.reject(err)
    )
  }
}
