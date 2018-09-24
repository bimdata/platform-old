export default {
  SET_CLOUD: (state, selectedCloud) => {
    state.selectedCloud = selectedCloud
  },
  SET_PROJECT: (state, selectedProject) => {
    state.selectedProject = selectedProject
  },
  SET_TREE: (state, tree) => {
    state.tree = tree
  },
  SET_IFCS: (state, ifcs) => {
    state.ifcs = ifcs
  },
  SET_ELEMENTS: (state, elements) => {
    state.elements = elements
  },
  SET_CURRENT_FOLDER_ID: (state, currentFolderId) => {
    state.currentFolderId = currentFolderId
  },
  SET_CURRENT_ELEMENT: (state, currentElement) => {
    state.currentElement = currentElement
  },
  SET_CURRENT_PATH: (state, currentPath) => {
    state.currentPath = currentPath
  }
}
