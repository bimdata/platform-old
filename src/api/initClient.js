import bimdata from '@bimdata/bimdata-api-client'

const defaultClientInstance = bimdata.ApiClient.instance
let Bearer
Bearer = defaultClientInstance.authentications['Bearer']
Bearer.type = 'oauth2'
Bearer.accessToken = localStorage.getItem('token')

export default bimdata
