<template>
  <div v-if="isPanoramaExist" class="model-preview-slider">
    <div class="model-preview-controls">
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
    <model-preview :imgURL="panoramas[activePanIndex].viewer_360_file"></model-preview>
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
    },
    prevPan () {
      this.activePanIndex--
    }
  }
}
</script>
