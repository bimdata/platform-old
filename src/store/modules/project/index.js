import actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
export default {
  namespaced: true,
  state: {
    selectedCloud: null,
    selectedProject: null
  },
  actions,
  mutations,
  getters
}
