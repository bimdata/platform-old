import Login from '../../../api/login'
import App from '../../../main'

export const login = ({ commit, state }, {username, password}) => {
  return new Promise((resolve, reject) => {
    Login.getToken({username, password}).then(
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

export const forgotPassword = ({commit}, email) => {
  Login.forgotPassword(email)
}

export const signUp = async (context, payload) => {
  try {
    const response = await Login.signUp(payload)
    return response
  } catch (e) {
    switch (e.message) {
      case 'already_exist':
        throw e

      case 'bad_request':
        throw e

      case 'server_error':
        throw e
    }
  }
}

export const resetPassword = ({commit}, payload) => {
  Login.resetPassword(payload)
}

export const setAuthenticated = ({commit}) => {
  commit('LOGIN', null, {root: true})
}

export const addError = ({commit}, {field, message}) => {
  commit('ADD_ERROR_FIELD', {field, message})
}
