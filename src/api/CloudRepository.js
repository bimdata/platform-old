export class CloudRepository {
  constructor (defaultClient) {
    this.cloudApiClient = new defaultClient.CloudApi()
  }

  async getSelfUserClouds () {
    try {
      const response = await this.cloudApiClient.getClouds()
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
