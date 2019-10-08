/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
import * as bimdata from '@bimdata/bimdata-api-client'

export const generateClient = (accessToken) => {
  const defaultClientInstance = bimdata.ApiClient.instance
  defaultClientInstance.basePath = process.env.BD_API_BASE_URL
  let bearer = defaultClientInstance.authentications.Bearer
  bearer.type = 'oauth2'
  bearer.accessToken = accessToken

  return bimdata
}
export default bimdata
