export class IFCRepository {
  constructor (defaultClient) {
    this.defaultClient = new defaultClient.IfcApi()
  }

  async getProjectIfcs ({ cloudPk, projectPk }, status) {
    try {
      let response
      if (status !== undefined && typeof status === 'string') {
        response = await this.defaultClient.getIfcs(cloudPk, projectPk, { status })
      } else {
        response = await this.defaultClient.getIfcs(cloudPk, projectPk)
      }

      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  async getIFCElements ({cloudPk, projectPk, ifcPk}) {
    try {
      const response = await this.defaultClient.getElements(
        cloudPk,
        ifcPk,
        projectPk,
        {type: 'IfcSite'}
      )

      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }
}
