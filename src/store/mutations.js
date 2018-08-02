import app from '../main'

export default {
  LOGIN: (state, token) => {
    state.token = token
    state.isAuthenticated = true
  },
  LOGOUT: (state) => {
    state.token = null
    state.isAuthenticated = false
  },
  SET_LANG: (state, payload) => {
    app.$i18n.locale = payload
    state.lang = payload
  },
  SET_USER_DATA: (state, user) => {
    state.currentUser = user
  },
  SET_USER_CLOUDS: (state, clouds) => {
    state.clouds = clouds
  },
  SET_USER_PROJECTS: (state, projects) => {
    state.projects = projects
  },
  SET_CURRENT_CLOUD: (state, cloud) => {
    state.currentCloud = cloud
  },
  SET_CURRENT_PROJECT: (state, project) => {
    state.currentProject = project
  }
}
