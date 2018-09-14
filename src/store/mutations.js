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
  ADD_USER_PROJECT: (state, project) => {
    state.projects.push(project)
  },
  DELETE_USER_PROJECT: (state, project) => {
    state.projects = state.projects.filter((p) => project.id !== p.id)
  },
  UPDATE_USER_PROJECT: (state, project) => {
    state.projects = state.projects.map((p) => (project.id === p.id) ? project : p)
  },
  SET_CURRENT_CLOUD: (state, cloud) => {
    state.currentCloud = cloud
  },
  SET_CURRENT_PROJECT: (state, project) => {
    state.currentProject = project
  }
}
