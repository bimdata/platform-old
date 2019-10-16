<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
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
