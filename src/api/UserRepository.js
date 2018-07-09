import bimdata from '@bimdata/bimdata-api-client'

export class UserRepository {
  constructor () {
    const defaultClientInstance = bimdata.ApiClient.instance
    let Bearer
    Bearer = defaultClientInstance.authentications['Bearer']
    Bearer.apiKey = localStorage.getItem('token')
    this.defaultClient = new bimdata.UserApi()
  }

  async getMyUserData () {
    try {
      const response = await this.defaultClient.getSelfUser()
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
