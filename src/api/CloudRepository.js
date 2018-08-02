export class CloudRepository {
  constructor (defaultClient) {
    this.defaultClient = new defaultClient.CloudApi()
  }

  async getSelfUserClouds () {
    try {
      const response = await this.defaultClient.getClouds()
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
