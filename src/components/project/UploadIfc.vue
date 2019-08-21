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
                          @upload-progress="onUploadProgress"
                          @upload-complete="onUploadComplete"
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
    cancelledUploadFileId: String
  }),
  computed: {
    ...mapState('project', {
      project: 'selectedProject'
    })
  },
  created () {
    this.cancelledUploadFileId = ''
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
    onUploadComplete (result) {
      this.$store.dispatch('project/fetchProjectIfc', this.project)
      this.$store.dispatch('project/getTree', this.project)
      result.successful.forEach(file => {
        this.uploadingFiles = this.uploadingFiles.filter(el => el.id !== file.id)
      })
      this.$emit('upload-complete', result)
    }
  }
}
</script>
