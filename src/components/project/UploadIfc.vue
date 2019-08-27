<template>
    <div>
        <uploading-ifc-list
          :files="uploadingFiles"
          @on-cancel-upload="cancelUpload">
        </uploading-ifc-list>
        <base-upload-area :project-id="project.id"
                          class="upload-area-ifc"
                          :cloud-id="project.cloud.id"
                          :cancel-upload="cancelledUploadFileId"
                          @on-upload-progress="onUploadProgress"
                          @on-upload-complete="onUploadComplete"
                          @on-upload-error="onUploadError"
                          @on-cancel-done="removeFile">
        </base-upload-area>
    </div>
</template>
<script>
import UploadingIfcList from '@/components/project/UploadingIfcList'
import BaseUploadArea from '@/components/base-components/BaseUploadArea'
import { mapState } from 'vuex'

export default {
  components: {
    BaseUploadArea,
    UploadingIfcList
  },
  data: () => ({
    uploadingFiles: [],
    cancelledUploadFileId: ''
  }),
  computed: {
    ...mapState('project', {
      project: 'selectedProject'
    })
  },
  methods: {
    removeFile (fileId) {
      this.uploadingFiles = this.uploadingFiles.filter(el => el.id !== fileId)
    },
    cancelUpload (fileId) {
      this.cancelledUploadFileId = fileId
    },
    onUploadProgress (payload) {
      let foundFileIndex = this.uploadingFiles.findIndex(el => el.id === payload.id)
      if (foundFileIndex === -1) {
        this.uploadingFiles.push(payload)
      } else {
        this.uploadingFiles[foundFileIndex].uploaded = payload.uploaded
      }
    },
    onUploadError (fileId) {
      let foundFileIndex = this.uploadingFiles.findIndex(el => el.id === fileId)
      this.uploadingFiles[foundFileIndex].state = 'fail'
    },
    onUploadComplete (result) {
      this.$store.dispatch('project/fetchProjectIfc', this.project)
      this.$store.dispatch('project/getTree', this.project)
      result.successful.forEach(file => {
        let foundFileIndex = this.uploadingFiles.findIndex(el => el.id === file.id)
        this.uploadingFiles[foundFileIndex].state = 'success'
      })
      this.$emit('upload-complete', result)
    }
  }
}
</script>
