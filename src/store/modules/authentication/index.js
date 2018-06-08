import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    hasErrors: false,
    globalErrors: [],
    username: {
      value: '',
      errors: []
    },
    password: {
      value: '',
      errors: []
    }
  },
  mutations,
  actions,
  getters
}
