<template>
    <div class="upload-area-dms">
      <input
        ref="input_file"
        v-show="false"
        type="file"
        name="files[]"
        @change="handleInputChange"
        multiple="true"
      >
      <base-button-tool @click="click" iconName="newfile" class="uppy modalOpener" :label="$t('project.import_document')">
      </base-button-tool>
    </div>
</template>
<script>
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import toArray from '@uppy/utils/lib/toArray'
import BaseButtonTool from '@/components/base-components/BaseButtonTool'
import { mapState } from 'vuex'

export default {
  props: {
    target: {
      type: String,
      default: '.DMSDashboardContainer'
    },
    cancelUpload: {
      type: String,
      default: ''
    },
    retryUpload: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      uppy: null
    }
  },
  components: {
    BaseButtonTool
  },
  computed: {
    ...mapState('project', {
      project: 'selectedProject'
    }),
    projectId () {
      return this.project.id
    },
    cloudId () {
      return this.project.cloud.id
    },
    currentFolderId () {
      return this.$store.state.project.currentFolderId
    }
  },
  watch: {
    currentFolderId () {
      this.uppy.setMeta({
        parent_id: this.currentFolderId
      })
    },
    cancelUpload: function (newCancelUpload, _) {
      this.uppy.removeFile(newCancelUpload)
      this.$emit('on-cancel-done', newCancelUpload)
    },
    retryUpload: function (newRetryUpload, _) {
      this.uppy.retryUpload(newRetryUpload)
      this.$emit('on-retry-upload', newRetryUpload)
    }
  },
  methods: {
    click () {
      this.$refs.input_file.click()
    },
    handleInputChange (event) {
      const files = toArray(event.target.files)

      files.forEach((file) => {
        try {
          this.uppy.addFile({
            source: this.id,
            name: file.name,
            type: file.type,
            data: file
          })
        } catch (err) {
          if (!err.isRestriction) {
            this.uppy.log(err)
          }
        }
      })
      event.target.value = null
    }
  },
  mounted () {
    let baseApiUrl = process.env.BD_API_BASE_URL
    let endpointUpload = baseApiUrl + '/cloud/' + this.cloudId + '/project/' + this.projectId + '/document'
    let token = this.$store.state.oidc.access_token

    this.uppy = new Uppy({
      debug: true,
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000000000, // 1 Go
        maxNumberOfFiles: null,
        minNumberOfFiles: 1
      }
    })
      .use(XHRUpload, {
        endpoint: endpointUpload,
        fieldName: 'file',
        headers: {
          'authorization': `Bearer ${token}`
        }
      })

    this.uppy.setMeta({
      parent_id: this.currentFolderId
    })

    this.uppy.on('upload-progress', (file, progress) => {
      const payload = {
        id: file.id,
        name: file.name,
        extension: file.extension,
        uploaded: progress.bytesUploaded,
        total: progress.bytesTotal
      }
      this.$emit('on-upload-progress', payload)
    })

    this.uppy.on('upload-error', (file, error, response) => {
      this.$emit('on-upload-error', file.id)
    })

    this.uppy.on('complete', result => {
      this.$store.dispatch('project/getTree', this.$store.state.project.selectedProject)
      this.$store.dispatch('project/fetchProjectIfc', this.project)
      this.$emit('on-upload-complete', result)

      if (result.successful) {
      }
    })
  }
}
</script>
