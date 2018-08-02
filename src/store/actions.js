import { UserRepository } from '@/api/UserRepository'
import { CloudRepository } from '@/api/CloudRepository'
import defaultClient from '@/api/initClient'

export default {
  init () {
    this.UserRepositoryRequest = new UserRepository(defaultClient)
    this.CloudRepositoryRequest = new CloudRepository(defaultClient)
  },
  async fetchUserData ({commit}) {
    try {
      const response = await this.UserRepositoryRequest.getSelfUserData()
      commit('SET_USER_DATA', response)
      return response
    } catch (e) {
      console.log(e)
    }
  },
  async fetchSelfUserProjects ({commit}) {
    try {
      const response = await this.UserRepositoryRequest.getSelfProjects()
      commit('SET_USER_PROJECTS', response)
      return response
    } catch (e) {
      console.log(e)
    }
  },
  async fetchUserCloudsDetails (context) {
    try {
      const response = await this.CloudRepositoryRequest.getSelfUserClouds()
      context.commit('SET_USER_CLOUDS', response)
      return response
    } catch (e) {
      console.log(e)
    }
  },
  setLang ({commit}, payload) {
    commit('SET_LANG', payload)
  }
}
