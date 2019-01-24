export const getCurrentUserFirstname = state => state.oidc.user
  ? state.oidc.user.given_name : null

export const getCurrentUserLastname = state => state.oidc.user
  ? state.oidc.user.family_name : null

export const getCurrentUserId = state => state.currentUser.id

export const getCurrentUserEmail = state => state.currentUser.email

export const getCloudsDetails = state => state.clouds

export const getCurrentCloud = (state) => {
  return state.currentCloud
}

export const getCloudById = state => idCloud => {
  return state.clouds.find(cloud => {
    return parseInt(idCloud) === cloud.id
  })
}

export const getProjectById = state => idProject => {
  if (state.currentCloud.projects) {
    return state.currentCloud.projects.find(project => {
      return parseInt(idProject) === project.id
    })
  }

  return []
}

export const getCloudByProjectId = state => idProject => {
  let cloudResult = null
  if (state.clouds) {
    state.clouds.forEach((cloud) => {
      cloud.projects.find(project => {
        if (parseInt(idProject) === project.id) {
          cloudResult = cloud
        }
      })
    })
  }
  return cloudResult
}
