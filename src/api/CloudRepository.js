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

  getCloudUsers (idCloud) {
    try {
      return this.cloudApiClient.getCloudUsers(idCloud)
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  inviteUser (cloudId, invite) {
    return this.cloudApiClient.inviteCloudUser(cloudId, invite)
  }

  async deleteCloudUser (cloudPk, id) {
    try {
      const response = await this.cloudApiClient.deleteCloudUser(cloudPk, id)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  updateUser ({ cloudId, userId, data }) {
    return this.cloudApiClient.updateCloudUser(cloudId, userId, data)
  }

  async getCloudInvitations (cloudPk) {
    try {
      let response = this.cloudApiClient.getCloudInvitations(cloudPk)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
