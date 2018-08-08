<template>
    <div>
        <base-upload-area :project-id="project.id"
                          :cloud-id="cloud.id">
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
      project: 'selectedProject',
      cloud: 'selectedCloud'
    })
  }
}
</script>
