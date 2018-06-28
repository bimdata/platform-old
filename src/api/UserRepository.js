import bimdata from '@/api/BimDataClient'

class UserRepository {
  constructor ({defaultClient}) {
    this.defaultClient = defaultClient
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

export default new UserRepository({
  defaultClient: new bimdata.UserApi()
})
