<template>
    <div>
      <uploading-ifc-item
        v-for="(file, index) in files"
        :key="`uploading-file-${index}`"
        :file="file"
        :uploaded="file.uploaded"
        @on-cancel-upload="cancelUpload"
      >
      </uploading-ifc-item>
    </div>
</template>
<script>
import UploadingIfcItem from '@/components/project/UploadingIfcItem'
// import { mapState } from 'vuex'

export default {
  components: {
    UploadingIfcItem
  },
  props: {
    files: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // ...mapState('project', {
    //   project: 'selectedProject'
    // })
  },
  methods: {
    cancelUpload (fileId) {
      this.$emit('on-cancel-upload', fileId)
    },
    onUploadComplete (result) {
      // this.$store.dispatch('project/fetchProjectIfc', this.project)
      // this.$store.dispatch('project/getTree', this.project)
      // this.$emit('upload-complete', result)
    }
  }
}
</script>
