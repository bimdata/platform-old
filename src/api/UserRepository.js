export class UserRepository {
  constructor (defaultClient) {
    this.defaultClient = new defaultClient.UserApi()
  }

  async getSelfUserData () {
    try {
      const response = await this.defaultClient.getSelfUser()
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  async getSelfProjects () {
    try {
      const response = await this.defaultClient.getSelfProjects()
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
