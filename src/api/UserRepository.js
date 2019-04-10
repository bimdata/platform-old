export class UserRepository {
  constructor (defaultClient) {
    this.userApiClient = new defaultClient.UserApi()
  }

  async getSelfUserData () {
    try {
      const response = await this.userApiClient.getSelfUser()
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  async getSelfProjects () {
    try {
      const response = await this.userApiClient.getSelfProjects()
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
