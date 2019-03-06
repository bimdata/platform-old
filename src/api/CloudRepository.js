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

  async createNewCloud (name) {
    try {
      let cloud = new this.defaultClient.Cloud()
      cloud.name = name
      const response = await this.cloudApiClient.createCloud(cloud)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  async deleteCloud (idCloud) {
    try {
      const response = await this.cloudApiClient.deleteCloud(idCloud)
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

  async getCloudUsers (idCloud) {
    try {
      const response = await this.cloudApiClient.getCloudUsers(idCloud)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  inviteUser (cloudId, invite) {
    return this.cloudApiClient.cloudInvite(cloudId, invite)
  }

  async deleteCloudUser (idCloud, userId) {
    try {
      const response = await this.cloudApiClient.deleteCloudUser(idCloud, userId)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
