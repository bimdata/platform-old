import { UserRepository } from '@/api/UserRepository'
import { CloudRepository } from '@/api/CloudRepository'
import { ProjectRepository } from '@/api/ProjectRepository'
import router from '@/router'
import { generateClient } from '@/api/initClient'

export default {
  init ({getters}) {
    let defaultClient = generateClient(getters.oidcAccessToken)
    console.log(getters.oidcAccessToken)
    this.UserRepositoryRequest = new UserRepository(defaultClient)
    this.CloudRepositoryRequest = new CloudRepository(defaultClient)
    this.ProjectRepositoryRequest = new ProjectRepository(defaultClient)
  },
  oidcCheckAuthAccessRedirect (context, { route, redirectAuto }) {
    return new Promise((resolve) => {
      let hasAccess = true
      if (!(context.state.oidc.access_token || context.state.oidc.id_token) && !route.meta.isOidcCallback) {
        if (route.meta.isPublic) {

        } else {
          const redirectPath = document.location.pathname + (document.location.search || '') + (document.location.hash || '')
          sessionStorage.setItem('vuex_oidc_active_route', redirectPath)
          if (redirectAuto === undefined) {
            router.push({name: 'signin-required'})
          } else {
            router.push({name: 'signin-required', query: { redirect: 'auto' }})
          }
          hasAccess = false
        }
      }
      resolve(hasAccess)
    })
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
  async removeProject (context, project) {
    try {
      await this.ProjectRepositoryRequest.deleteProject(context.state.currentCloud.id, project)
      context.commit('DELETE_USER_PROJECT', project)
      return true
    } catch (e) {
      console.log(e)
    }
  },
  async addProject (context, projectName) {
    try {
      const newProject = await this.ProjectRepositoryRequest.createNewProject(context.state.currentCloud.id, projectName)
      context.commit('ADD_USER_PROJECT', newProject)
      return newProject
    } catch (e) {
      console.log(e)
    }
  },
  async updateProject (context, project) {
    try {
      await this.ProjectRepositoryRequest.updateProject(context.state.currentCloud.id, project)
      context.commit('UPDATE_USER_PROJECT', project)
      return project
    } catch (e) {
      console.log(e)
    }
  },
  async removeCloud (context, cloud) {
    try {
      await this.CloudRepositoryRequest.deleteCloud(context.state.currentCloud.id, cloud)
      context.commit('DELETE_USER_CLOUD', cloud)
      return true
    } catch (e) {
      console.log(e)
    }
  },
  async addCloud (context, projectName) {
    try {
      const newProject = await this.CloudRepositoryRequest.createNewCloud(context.state.currentCloud.id, projectName)
      context.commit('ADD_USER_CLOUD', newProject)
      return newProject
    } catch (e) {
      console.log(e)
    }
  },
  async updateCloud (context, cloud) {
    try {
      await this.CloudRepositoryRequest.updateCloud(cloud)
      context.commit('UPDATE_USER_CLOUD', cloud)
      return cloud
    } catch (e) {
      console.log(e)
    }
  },
  async getCloudUsers (context, idCloud) {
    try {
      let result = await this.CloudRepositoryRequest.getCloudUsers(idCloud)
      return result ? result.length : 0
    } catch (e) {
      console.log(e)
    }
  },
  setLang ({commit}, payload) {
    commit('SET_LANG', payload)
  }
}
