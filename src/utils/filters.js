/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
import Vue from 'vue'
import moment from 'moment/moment'

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('middle-truncate', function (text, stop, clamp) {
  if (text.length <= stop) {
    return text
  }
  clamp = clamp || '...'
  let sepLen = clamp.length
  let charsToShow = stop - sepLen
  let frontChars = Math.ceil(charsToShow / 2)
  let backChars = Math.floor(charsToShow / 2)
  return text.substr(0, frontChars) + clamp + text.substr(text.length - backChars)
})

Vue.filter('formatDate', function (value, activeHours = true) {
  if (value) {
    if (activeHours) {
      return moment(String(value)).format('DD/MM/YYYY hh:mm')
    } else {
      return moment(String(value)).format('DD/MM/YYYY')
    }
  }
})

Vue.filter('getFormattedSize', function (bytes, decimals) {
  if (bytes === 0) {
    return '0 Byte'
  }
  let k = 1024
  let dm = decimals <= 0 ? 0 : decimals || 2
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
})

Vue.filter('initialsFormat', function (value) {
  if (value) {
    let separate = value.split(' ')
    let firstname = separate[0]
    let lastname = separate[1]
    return firstname[0] + lastname[0]
  }
})
