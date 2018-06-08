import Login from '../../../api/login'

export const login = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    Login.getToken({username: state.username, password: state.password}).then(
      accessToken => {
        localStorage.setItem('token', accessToken)
        commit('LOGIN', null, {root: true})
        resolve()
      },
      error => {
        reject(error)
      }
    )
  })
}

export const setAuthenticated = ({commit}) => {
  commit('LOGIN', null, {root: true})
}

export const addError = ({commit}, {field, message}) => {
  commit('ADD_ERROR_FIELD', {field, message})
}
