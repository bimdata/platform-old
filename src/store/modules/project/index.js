/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
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
