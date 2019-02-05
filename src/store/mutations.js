import app from '../main'

export default {
  SET_LANG: (state, payload) => {
    app.$i18n.locale = payload
    state.lang = payload
  },
  SET_INITIALIZED_DATA: (state, value) => {
    state.initializedData = value
  },
  SET_USER_DATA: (state, user) => {
    state.currentUser = user
  },
  SET_USER_CLOUDS: (state, clouds) => {
    state.clouds = clouds
  },
  ADD_PROJECT: (state, project) => {
    state.currentCloud.projects.push(project)
  },
  DELETE_PROJECT: (state, project) => {
    state.currentCloud.projects = state.currentCloud.projects.filter((p) => project.id !== p.id)
  },
  UPDATE_USER_PROJECT: (state, project) => {
    state.projects = state.projects.map((p) => (project.id === p.id) ? project : p)
  },
  UPDATE_USER_CLOUD: (state, cloud) => {
    state.clouds = state.clouds.map((c) => (cloud.id === c.id) ? cloud : c)
  },
  SET_CURRENT_CLOUD: (state, cloud) => {
    state.currentCloud = cloud
  },
  SET_LOADER_PAGE: (state, value) => {
    state.loaderPage = value
  }
}
