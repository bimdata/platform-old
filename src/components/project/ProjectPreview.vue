<template>
  <div class="project-preview">
    <div v-if="!image" class="project-preview-icon">
      <svgicon name="img-placeholder" height="30" width="30"></svgicon>
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
      this.image = await this.getProjectIfcImage({
        cloudPk: this.cloudId,
        projectPk: this.projectId
      })
    }
  }
}
</script>
