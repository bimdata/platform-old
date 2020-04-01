/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
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
      console.error(e.statusCode)
    }
  }

  async getIfc (cloudPk, id, projectPk) {
    try {
      const response = await this.ifcApiClient.getIfc(cloudPk, id, projectPk)
      return response
    } catch (e) {
      console.error(e)
    }
  }

  async optimizeIfc (cloudPk, id, projectPk) {
    try {
      const response = await this.ifcApiClient.optimizeIfc(cloudPk, id, projectPk, {})
      return response
    } catch (e) {
      console.error(e)
    }
  }

  async getIfcSites ({cloudPk, projectPk, ifcPk}) {
    try {
      const response = await this.ifcApiClient.getElements(
        cloudPk,
        ifcPk,
        projectPk,
        {type: 'IfcSite'}
      )

      return response
    } catch (e) {
      console.error(e.statusCode)
    }
  }

  async createIfcSite ({cloudPk, projectPk, ifcPk, lat, long, postalAddress}) {
    try {
      const site = {
        type: 'IfcSite',
        attributes: {
          type: 'Attributes',
          properties: [
            {
              definition: {
                name: 'RefLongitude'
              },
              value: long
            },
            {
              definition: {
                name: 'RefLatitude'
              },
              value: lat
            },
            {
              definition: {
                name: 'SiteAddress'
              },
              value: postalAddress
            }
          ]
        }
      }
      const response = await this.ifcApiClient.createElement(
        cloudPk,
        ifcPk,
        projectPk,
        site
      )
      return response
    } catch (e) {
      console.error(e.statusCode)
    }
  }

  async configureIfcSiteAddress ({site, cloudPk, projectPk, ifcPk, lat, long, postalAddress}) {
    const elementUuid = site.uuid
    const propertysetPk = site.attributes.id

    const siteAddress = {
      definition: {
        name: 'SiteAddress'
      },
      value: postalAddress
    }
    const refLongitude = {
      definition: {
        name: 'RefLongitude'
      },
      value: long
    }
    const refLatitude = {
      definition: {
        name: 'RefLatitude'
      },
      value: lat
    }
    const calls = [
      this.ifcApiClient.createElementPropertySetProperty(cloudPk, elementUuid, ifcPk, projectPk, propertysetPk, siteAddress),
      this.ifcApiClient.createElementPropertySetProperty(cloudPk, elementUuid, ifcPk, projectPk, propertysetPk, refLongitude),
      this.ifcApiClient.createElementPropertySetProperty(cloudPk, elementUuid, ifcPk, projectPk, propertysetPk, refLatitude)
    ]
    await Promise.all(calls)
  }
}
