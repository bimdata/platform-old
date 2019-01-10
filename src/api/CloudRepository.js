export class CloudRepository {
  constructor (defaultClient) {
    this.defaultClient = defaultClient
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

  async createNewCloud (idCloud, name) {
    try {
      let cloud = new this.defaultClient.Cloud()
      // project.
      cloud.name = name
      const response = await this.cloudApiClient.createCloud(cloud)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  async updateCloud (cloud) {
    try {
      const response = await this.cloudApiClient.updateCloud(cloud.id, cloud)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
