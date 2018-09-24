import { IFCRepository } from '@/api/IFCRepository'
import { generateClient } from '@/api/initClient'
export default {
  init ({rootState}) {
    let token = rootState.oidc.access_token
    let defaultClient = generateClient(token)
    this.IFCRepositoryRequest = new IFCRepository(defaultClient)
  },
  async fetchProjectIfc ({ commit }, project) {
    try {
      let params = {
        cloudPk: project.cloud.id,
        projectPk: project.id
      }
      const ifcs = await this.IFCRepositoryRequest.getProjectIfcs(params)
      commit('SET_IFCS', ifcs)

      let hasPendingIfc = false
      let pendingStatus = ['P', 'I']
      for (let ifc of ifcs) {
        if (pendingStatus.includes(ifc.status)) {
          hasPendingIfc = true
        }
      }

      if (hasPendingIfc) {
        const idInterval = setInterval(async () => {
          const ifcsPending = this.IFCRepositoryRequest.getProjectIfcs(params, 'P')
          const ifcsInProcessing = this.IFCRepositoryRequest.getProjectIfcs(params, 'I')
          Promise.all([ ifcsPending, ifcsInProcessing ]).then(async ([resultPending, resultProcessing]) => {
            if (resultPending.length === 0 && resultProcessing.length === 0) {
              const ifcs = await this.IFCRepositoryRequest.getProjectIfcs(params)
              commit('SET_IFCS', ifcs)
              window.clearInterval(idInterval)
            }
          })
        }, 5000)
      }
      return ifcs
    } catch (e) {
      console.log(e)
    }
  },
  async fetchElements ({commit, state}, project) {
    try {
      let elements = []
      for (let ifc of state.ifcs) {
        let params = {
          cloudPk: state.selectedProject.cloud.id,
          projectPk: state.selectedProject.id,
          ifcPk: ifc.id
        }
        const elementResult = await this.IFCRepositoryRequest.getIFCElements(params)
        elements.push({...elementResult[0], ifc: ifc.id})
      }
      commit('SET_ELEMENTS', elements)
      return elements
    } catch (e) {
      console.log(e)
    }
  },
  async getTree ({commit, dispatch, state}, project) {
    try {
      const tree = await this.ProjectRepositoryRequest.getTree(project.cloud.id, project.id)
      commit('SET_TREE', tree)
      commit('SET_CURRENT_FOLDER_ID', tree.id)
      let treeArray = []
      treeArray.push(tree)
      console.log(treeArray)
      let result = await dispatch('getElement', {tree: treeArray, searchedId: state.currentFolderId})
      commit('SET_CURRENT_ELEMENT', result)
      return tree
    } catch (e) {
      console.log(e)
    }
  },
  async getElement (context, {tree, searchedId}) {
    let o
    tree.some(function iter (a) {
      if (a['id'] === searchedId) {
        o = a
        return true
      }
      return Array.isArray(a.children) && a.children.some(iter)
    })
    return o
  },
  async getParent ({dispatch}, {tree, searchedId, paths}) {
    let elt = await dispatch('getElement', {tree, searchedId})
    let pathsCollection = paths
    pathsCollection.push(elt)
    if (elt.parent_id !== null) {
      return dispatch('getParent', {tree, searchedId: elt.parent_id, paths: pathsCollection})
    } else {
      return pathsCollection
    }
  },
  async getPath (context) {
    let treeArray = []
    treeArray.push(context.state.tree)
    let result = await context.dispatch('getParent', {tree: treeArray, searchedId: context.state.currentFolderId, paths: []})
    context.commit('SET_CURRENT_PATH', result.reverse())
  },
  async changeFolder ({commit, dispatch, state}, idFolder) {
    commit('SET_CURRENT_FOLDER_ID', idFolder)
    let treeArray = []
    treeArray.push(state.tree)
    let result = await dispatch('getElement', {tree: treeArray, searchedId: state.currentFolderId})
    commit('SET_CURRENT_ELEMENT', result)
    await dispatch('getPath')
  }
}
