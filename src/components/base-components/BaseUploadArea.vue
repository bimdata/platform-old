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
    projectId: Number,
    cloudId: Number
  },
  mounted () {
    let baseApiUrl = process.env.BD_API_BASE_URL
    let endpointUpload = baseApiUrl + '/cloud/' + this.cloudId + '/project/' + this.projectId + '/document'

    const uppy = Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000000000, // 1 Go
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['.ifc']
      }
    })
      .use(Dashboard, {
        trigger: '.UppyModalOpenerBtn',
        inline: true,
        target: '.DashboardContainer',
        replaceTargetContent: true,
        showProgressDetails: true,
        note: '',
        proudlyDisplayPoweredByUppy: false,
        height: 470,
        browserBackButtonClose: true
      })
      .use(XHRUpload, {
        endpoint: endpointUpload,
        fieldName: 'file',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

    uppy.on('complete', result => {
      // console.log('successful files:', result.successful)
      // console.log('failed files:', result.failed)
      this.$emit('upload-complete', result)
    })
  }
}
</script>
