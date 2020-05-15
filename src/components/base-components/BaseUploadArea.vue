<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="upload-area">
        <button class="uppy UppyModalOpenerBtn" style="display: none;">Open Uppy Dashboard Modal</button>
        <div class="DashboardContainer"></div>
    </div>
</template>
<script>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'

export default {
  props: {
    projectId: {
      type: Number,
      default: null
    },
    cloudId: {
      type: Number,
      default: null
    },
    target: {
      type: String,
      default: '.DashboardContainer'
    }
  },
  mounted () {
    let baseApiUrl = process.env.BD_API_BASE_URL
    let endpointUpload = baseApiUrl + '/cloud/' + this.cloudId + '/project/' + this.projectId + '/document'
    let token = this.$store.state.oidc.access_token
    let target = this.target

    const uppy = new Uppy({
      debug: false,
      autoProceed: false,
      restrictions: {
        maxFileSize: process.env.BD_MAX_UPLOAD_SIZE,
        maxNumberOfFiles: null,
        minNumberOfFiles: 1,
        allowedFileTypes: ['.ifc', '.ifczip']
      }
    })
      .use(Dashboard, {
        trigger: '.UppyModalOpenerBtn',
        inline: true,
        target: target,
        replaceTargetContent: true,
        showProgressDetails: true,
        note: '',
        proudlyDisplayPoweredByUppy: false,
        height: 163,
        browserBackButtonClose: true
      })
      .use(XHRUpload, {
        endpoint: endpointUpload,
        fieldName: 'file',
        headers: {
          'authorization': `Bearer ${token}`
        }
      })

    uppy.on('complete', result => {
      setTimeout(() => {
        uppy.reset()
        this.$emit('upload-complete', result)
      }, 2000)
    })
  }
}
</script>
