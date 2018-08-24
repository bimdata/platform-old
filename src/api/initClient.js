import bimdata from '@bimdata/bimdata-api-client'

export const generateClient = (accessToken) => {
  const defaultClientInstance = bimdata.ApiClient.instance
  defaultClientInstance.basePath = process.env.BD_API_BASE_URL
  let Bearer
  Bearer = defaultClientInstance.authentications['Bearer']

  Bearer.type = 'oauth2'
  Bearer.accessToken = accessToken

  return bimdata
}
export default bimdata
