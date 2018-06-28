import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    currentUser: {}
  },
  mutations,
  actions,
  getters
}
