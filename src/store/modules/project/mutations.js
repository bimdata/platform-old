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
  }
}
