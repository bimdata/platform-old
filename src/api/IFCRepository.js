export class IFCRepository {
  constructor (defaultClient) {
    this.ifcApiClient = new defaultClient.IfcApi()
  }

  async getProjectIfcs ({ cloudPk, projectPk }, status) {
    try {
      let response
      if (status !== undefined && typeof status === 'string') {
        response = await this.ifcApiClient.getIfcs(cloudPk, projectPk, { status })
      } else {
        response = await this.ifcApiClient.getIfcs(cloudPk, projectPk)
      }

      return response
    } catch (e) {
      console.log(e.statusCode)
    }
  }

  async getIfc (cloudPk, id, projectPk) {
    try {
      const response = await this.ifcApiClient.getIfc(cloudPk, id, projectPk)
      return response
    } catch (e) {
      console.log(e)
    }
  }

  async getIFCElements ({cloudPk, projectPk, ifcPk}) {
    try {
      const response = await this.ifcApiClient.getElements(
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
