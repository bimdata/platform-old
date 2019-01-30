<template>
  <div v-if="isPanoramaExist" class="model-preview-slider">
    <model-preview :imgURL="panoramas[activePanIndex].viewer_360_file"></model-preview>
    <div class="model-preview-controls">
      <div
        @click="prevPan"
        v-if="activePanIndex > 0"
        class="model-control model-control__left"
      >
        <svgicon name="chevron-left" height="30" width="30"></svgicon>
      </div>
      <div
        @click="nextPan"
        v-if="activePanIndex < panoramas.length - 1"
        class="model-control model-control__right"
      >
        <svgicon name="chevron-right" height="30" width="30"></svgicon>
      </div>
      <div v-if="showViewerButton" class="model-control-button">
        <base-button-action @click="viewModel(panoramas[activePanIndex].id)" icon-name="eye">{{ $t('ifc.open') }}</base-button-action>
      </div>
      <div class="model-preview-counter"><b class="text-primary">{{currentCounter}}</b>/{{this.panoramas.length}}</div>
    </div>
  </div>
</template>

<script>
import ModelPreview from './ModelPreview'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'

export default {
  name: 'ModelPreviewSlider',
  components: { ModelPreview, BaseButtonAction },
  data () {
    return {
      activePanIndex: 0
    }
  },
  computed: {
    isPanoramaExist () {
      return this.panoramas.length > 0
    },
    currentCounter () {
      return this.activePanIndex + 1
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
    }
  },
  methods: {
    viewModel (ifcId) {
      const params = {
        cloudId: this.$store.state.currentCloud.id,
        projectId: this.$route.params.id,
        ifcId
      }

      this.$router.push({ name: 'viewer', params })
    },
    nextPan () {
      this.activePanIndex++
      this.$emit('current-panorama-name', this.panoramas[this.activePanIndex].name)
    },
    prevPan () {
      this.activePanIndex--
      this.$emit('current-panorama-name', this.panoramas[this.activePanIndex].name)
    }
  },
  created () {
    this.$emit('current-panorama-name', this.panoramas[this.activePanIndex].name)
  }
}
</script>
