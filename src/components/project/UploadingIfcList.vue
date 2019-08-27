<template>
    <div>
      <uploading-ifc-item
        v-for="(file, index) in files"
        :key="`uploading-file-${index}`"
        :file="file"
        :uploaded="file.uploaded"
        :state="file.state"
        @on-cancel-upload="cancelUpload"
      >
      </uploading-ifc-item>
    </div>
</template>
<script>
import UploadingIfcItem from '@/components/project/UploadingIfcItem'

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
  methods: {
    cancelUpload (fileId) {
      this.$emit('on-cancel-upload', fileId)
    }
  }
}
</script>
