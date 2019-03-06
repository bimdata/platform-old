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

export const user = state => state.oidc.user

export const getCustomUrl = state => {
  // Only check if there if one customized viewer.
  // If there is more than 1, only the first will be used.
  // TODO: menu to select the viewer to launch
  const customUrlItem = state.currentCloud && state.currentCloud.features
    ? state.currentCloud.features.find(item => item.viewer_url)
    : null

  return customUrlItem ? customUrlItem.viewer_url : null
}

export const getProjectsByCloudId = state => cloudId => {
  return state.currentCloud.projects
    .filter(project => project.cloud.id === cloudId)
}

export const getCloudById = state => cloudId => {
  return state.clouds.find(cloud => parseInt(cloud.id) === parseInt(cloudId))
}

export const getProjectById = state => projectId => {
  if (state.currentCloud.projects.length) {
    return state.currentCloud.projects
      .find(project => parseInt(project.id) === parseInt(projectId))
  }

  return []
}

export const getCloudByProjectId = state => projectId => {
  let cloudResult = null
  if (state.clouds) {
    state.clouds.forEach((cloud) => {
      cloud.projects.find(project => {
        if (parseInt(projectId) === parseInt(project.id)) {
          cloudResult = cloud
        }
      })
    })
  }
  return cloudResult
}

export const currentCloudGuests = state => state.currentCloud.guests
