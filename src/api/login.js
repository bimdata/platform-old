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
  signUp (payload) {
    this.defaultClient.signUp(payload).then(response => {
      debugger
    }, err => {
      console.log(err)
      debugger
    })
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
