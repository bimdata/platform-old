export class IFCRepository {
  constructor (defaultClient) {
    this.defaultClient = new defaultClient.IfcApi()
  }

  async getProjectIfcs ({ cloudPk, projectPk }) {
    try {
      const response = await this.defaultClient.getIfcs(cloudPk, projectPk)
      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
