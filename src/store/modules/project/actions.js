import { IFCRepository } from '@/api/IFCRepository'
import defaultClient from '@/api/initClient'

export default {
  init () {
    this.IFCRepositoryRequest = new IFCRepository(defaultClient)
  },
  async selectProject ({ commit }, project) {
    try {
      let params = {
        cloudPk: project.cloud.id,
        projectPk: project.id
      }
      const ifcs = await this.IFCRepositoryRequest.getProjectIfcs(params)
      commit('SET_IFCS', ifcs)
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
  }
}
