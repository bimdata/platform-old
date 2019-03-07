import actions from './actions'
import mutations from './mutations'
import getters from './getters'
export default {
  namespaced: true,
  state: {
    selectedCloud: null,
    selectedProject: null,
    ifcs: null,
    tree: null,
    currentFolderId: null,
    currentElement: null,
    elements: null,
    currentPath: [],
    openedFolderIds: [],
    users: [],
    guests: []
  },
  actions,
  mutations,
  getters
}
