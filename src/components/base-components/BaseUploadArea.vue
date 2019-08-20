<template>
    <div class="upload-area">
    </div>
</template>
<script>
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import DragDrop from '@uppy/drag-drop'

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

    const uppy = new Uppy({
      debug: false,
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000000000, // 1 Go
        maxNumberOfFiles: null,
        minNumberOfFiles: 1,
        allowedFileTypes: ['.ifc', '.ifczip']
      }
    })
      .use(DragDrop, {
        target: '.upload-area',
        width: '100%',
        height: '100%',
        note: null,
        locale: {}
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
        this.$emit('upload-complete', result)
      }, 2000)
    })
  }
}
</script>
