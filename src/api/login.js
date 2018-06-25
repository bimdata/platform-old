import request from 'axios'
import bimdata from '@bimdata/bimdata-api-client'

export default {
  defaultClient: new bimdata.UserApi(),
  getToken ({username, password}) {
    request.defaults.baseURL = process.env.BD_API_BASE_URL
    const dataToken = new FormData()
    dataToken.append('client_id', process.env.BD_CLIENT_ID)
    dataToken.append('client_secret', process.env.BD_CLIENT_SECRET)
    dataToken.append('username', username)
    dataToken.append('grant_type', 'password')
    dataToken.append('password', password)

    return new Promise((resolve, reject) => {
      request.post('token/', dataToken).then(response => {
        if (response.status === 200) {
          resolve(response.data.access_token)
        } else {
          reject(response)
        }
      }, function (error) {
        reject(error)
      })
    })
  },
  forgotPassword (email) {
    this.defaultClient.askResetPasswordToken({ email }).then(response => {
      debugger
    }, err => {
      console.log(err)
      debugger
    })
  },
  async signUp (payload) {
    try {
      debugger
      const response = await this.defaultClient.signUp(payload)
      return response
    } catch (e) {
      let text, statusCode
      [text, statusCode] = [JSON.parse(e.response.text), e.response.statusCode]
      if (statusCode === 400) {
        if (text.email[0] === 'This user already exists') {
          throw new Error('already_exist')
        }
        throw new Error('bad_request')
      } else if (statusCode >= 500) {
        throw new Error('server_error')
      }
    }
  },
  resetPassword (payload) {
    this.defaultClient.resetPassword(payload).then(response => {
      debugger
    }, err => {
      console.log(err)
      debugger
    })
  }
}
