import * as bimdata from '@bimdata/bimdata-api-client'

export const generateClient = (accessToken) => {
  const defaultClientInstance = bimdata.ApiClient.instance
  defaultClientInstance.basePath = process.env.BD_API_BASE_URL
  let Bearer = defaultClientInstance.authentications.Bearer
  Bearer.apiKeyPrefix = 'JWT'
  Bearer.type = 'apiKey'
  Bearer.apiKey = accessToken

  return bimdata
}
export default bimdata
