<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="project-preview">
    <div v-if="!image" class="project-preview-icon">
      <svgicon name="model" height="64" width="70"></svgicon>
    </div>
    <model-preview v-if="image" :imgURL="image"></model-preview>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModelPreview from './ModelPreview'

export default {
  name: 'ProjectPreview',
  components: { ModelPreview },
  props: {
    cloudId: {
      type: Number,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      image: null
    }
  },
  mounted () {
    this.getProjectImage()
  },
  methods: {
    ...mapActions({
      getProjectIfcImage: 'project/getProjectIfcImage'
    }),
    async getProjectImage () {
      let ifc = await this.getProjectIfcImage({
        cloudPk: this.cloudId,
        projectPk: this.projectId
      })

      if (ifc) {
        this.image = ifc.image
        this.$emit('has-image', ifc.id)
      } else {
        this.image = '/static/img/default-preview.png'
      }
    }
  }
}
</script>
