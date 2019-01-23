import app from '../main'

export default {
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
  ADD_PROJECT: (state, project) => {
    state.currentCloud.projects.push(project)
  },
  DELETE_USER_PROJECT: (state, project) => {
    state.projects = state.projects.filter((p) => project.id !== p.id)
  },
  UPDATE_USER_PROJECT: (state, project) => {
    state.projects = state.projects.map((p) => (project.id === p.id) ? project : p)
  },
  UPDATE_USER_CLOUD: (state, cloud) => {
    state.clouds = state.clouds.map((c) => (cloud.id === c.id) ? cloud : c)
  },
  SET_CURRENT_CLOUD: (state, cloud) => {
    state.currentCloud = cloud
  }
}
