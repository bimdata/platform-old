import Login from '../../../api/login'
import App from '../../../main'

export const login = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    Login.getToken({username: state.username.value, password: state.password.value}).then(
      accessToken => {
        localStorage.setItem('token', accessToken)
        commit('LOGIN', null, {root: true})
        App.$router.push({name: 'home'})
        resolve()
      },
      error => {
        reject(error.response.status)
      }
    )
  })
}

export const logoutUser = ({commit}) => {
  localStorage.removeItem('token')
  commit('LOGOUT', null, {root: true})
  App.$router.push({name: 'login'})
}

export const setAuthenticated = ({commit}) => {
  commit('LOGIN', null, {root: true})
}

export const addError = ({commit}, {field, message}) => {
  commit('ADD_ERROR_FIELD', {field, message})
}
