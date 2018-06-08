import axios from 'axios'
import app from '../main'
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

    axios.interceptors.response.use(function (response) {
      return response
    }, function (err) {
      if (err.response && err.response.status === 401) {
        if (app.$router.currentRoute.name !== 'tunnel_connexion') {
          // app.$modal.show(LogoutAlert, {}, {height: auto})
        }

        // app.$store.dispatch('authentication/logoutUser')
        return Promise.reject(err)
      } else {
        return Promise.reject(err)
      }
    })
  }
}
