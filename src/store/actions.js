import { UserRepository } from '@/api/UserRepository'
import { CloudRepository } from '@/api/CloudRepository'
import router from '@/router'
import { generateClient } from '@/api/initClient'

export default {
  init ({getters}) {
    let defaultClient = generateClient(getters.oidcAccessToken)
    this.UserRepositoryRequest = new UserRepository(defaultClient)
    this.CloudRepositoryRequest = new CloudRepository(defaultClient)
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
  setLang ({commit}, payload) {
    commit('SET_LANG', payload)
  }
}
