import axios from 'axios'

export default class {
  enableInterceptor () {
    axios.interceptors.response.use(response => response, err => {
      debugger
      if (err.response && err.response.status === 401) {
        return Promise.reject(err)
      } else {
        return Promise.reject(err)
      }
    })

    axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      debugger
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    }, err => Promise.reject(err)
    )
  }
}
