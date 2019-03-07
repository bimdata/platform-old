<template>
    <div>
        <base-upload-area :project-id="project.id"
                          class="upload-area-ifc"
                          :cloud-id="project.cloud.id"
                          @upload-complete="onUploadComplete">
        </base-upload-area>
    </div>
</template>
<script>
import BaseUploadArea from '@/components/base-components/BaseUploadArea'
import { mapState } from 'vuex'

export default {
  components: {
    BaseUploadArea
  },
  computed: {
    ...mapState('project', {
      project: 'selectedProject'
    })
  },
  methods: {
    onUploadComplete (result) {
      this.$store.dispatch('project/fetchProjectIfc', this.project)
      this.$store.dispatch('project/getTree', this.project)
      this.$emit('upload-complete', result)
    }
  }
}
</script>
