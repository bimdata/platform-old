import _ from 'lodash'

export const getToken = (state) => {
  return state.token
}

export const getCurrentUserFirstname = (state) => {
  return state.currentUser.firstname
}

export const getCurrentUserLastname = (state) => {
  return state.currentUser.lastname
}

export const getCurrentUserId = (state) => {
  return state.currentUser.id
}

export const getCloudsDetails = (state) => {
  return state.clouds
}

export const getCurrentCloud = (state) => {
  return state.currentCloud
}

export const getCurrentProject = (state) => {
  return state.currentProject
}

export const getCloudProjects = (state, idCloud) => {
  return state.projects.filter(elt => {
    return idCloud === elt.cloud.id
  })
}

export const getProjectsByCreatedDate = (state) => {
  return _.orderBy(state.projects, p => p.created_at, 'desc')
}

export const getCurrentCloudProjects = (state) => {
  return state.projects.filter(project => {
    return state.currentCloud.id === project.cloud.id
  })
}

export const getCloudById = state => idCloud => {
  return state.clouds.find(cloud => {
    return parseInt(idCloud) === cloud.id
  })
}

export const getProjectById = state => idProject => {
  return state.projects.find(project => {
    return parseInt(idProject) === project.id
  })
}
