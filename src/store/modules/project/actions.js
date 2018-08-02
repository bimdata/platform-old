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
      project.ifcs = ifcs
      commit('SET_PROJECT', project)
      return project
    } catch (e) {
      console.log(e)
    }
  }
}
