import bimdata from '@bimdata/bimdata-api-client'

const defaultClient = bimdata.ApiClient.instance
let Bearer
Bearer = defaultClient.authentications['Bearer']
Bearer.apiKey = localStorage.getItem('token')

export default bimdata
