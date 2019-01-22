<template>
  <div
    ref="modelPreview"
    class="model-preview"
  >
    <div
      class="model-image-wrapper"
      ref="modelWrapper"
      @mousemove="mouseHolder"
      :style="{
        width: `${viewerWidth}px`,
        height: `${viewerHeight}px`
      }"
    >
      <div class="model-preview-controls" v-if="panoramas.length > 1">
        <div
          @click="prevPan"
          v-if="activePanIndex > 0"
          class="model-control-left"
        ></div>
        <div
          @click="nextPan"
          v-if="activePanIndex < panoramas.length - 1"
          class="model-control-right"
        ></div>
        <div v-if="showViewerButton" class="model-control-button">
          <base-button-action @click="viewModel(panoramas[activePanIndex].id)" icon-name="model">{{ $t('ifc.view') }}</base-button-action>
        </div>
      </div>
      <div
        :style="{ left }"
        class="model-image-holder"
      >
        <img :src="panoramas[activePanIndex].viewer_360_file || defaultPanorama" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import BaseButtonAction from '@/components/base-components/BaseButtonAction'

export default {
  components: {
    BaseButtonAction
  },
  data () {
    return {
      imageWidth: 15360,
      imageHeight: 1024,
      viewerWidth: 0,
      viewerHeight: 0,
      imageIndex: 0,
      nbSlices: 15,
      activePanIndex: 0
    }
  },
  props: {
    panoramas: {
      type: Array,
      required: false,
      default: () => []
    },
    showViewerButton: {
      type: Boolean,
      required: false,
      default: false
    },
    imgURL: {
      type: String,
      required: false,
      default: '../../assets/images/model-preview.png'
    }
  },
  mounted () {
    this.viewerWidth = this.viewerHeight = this.$refs.modelPreview.getBoundingClientRect().width
  },
  computed: {
    left () {
      return `-${((this.imageWidth / this.nbSlices) * this.imageIndex) * (this.viewerHeight / this.imageHeight)}px`
    },
    defaultPanorama () {
      return '../../assets/images/model-preview.png'
    }
  },
  methods: {
    nextPan () {
      this.activePanIndex++
    },
    prevPan () {
      this.activePanIndex--
    },
    mouseHolder ($event) {
      const rect = this.$refs.modelWrapper.getBoundingClientRect()
      this.imageIndex = Math.abs(
        Math.ceil(
          this.nbSlices * (
            1 - (
              ($event.clientX - rect.left) /
              rect.width
            )
          )
        )
      ) - 1
    },
    viewModel (ifcId) {
      const params = {
        cloudId: this.$store.state.currentCloud.id,
        projectId: this.$route.params.id,
        ifcId
      }

      let customViewers = this.$store.state.project.selectedCloud.features.filter(f => f.viewer_url)
      if (customViewers.length > 0) {
        params.customUrl = customViewers[0].viewer_url
      }
      this.$router.push({ name: 'viewer', params})
    }
  }
}
</script>
