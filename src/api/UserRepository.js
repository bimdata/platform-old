/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
export class UserRepository {
  constructor (defaultClient) {
    this.userApiClient = new defaultClient.UserApi()
  }

  async getSelfUserData () {
    try {
      const response = await this.userApiClient.getSelfUser()
      return response
    } catch (e) {
      console.error(e.statusCode)
    }
  }

  async getSelfProjects () {
    try {
      const response = await this.userApiClient.getSelfProjects()
      return response
    } catch (e) {
      console.error(e.statusCode)
    }
  }
}
