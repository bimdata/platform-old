<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div v-if="isPanoramaExist" class="model-preview-slider">
    <model-preview :imgURL="imgURL"></model-preview>
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
        <base-button-action
          @click="viewModel(panoramas[activePanIndex].id)"
          icon-name="eye"
          icon-color="fff"
        >
        {{ $t('ifc.open') }}
        </base-button-action>
      </div>
      <div class="model-preview-counter">
        <b class="text-primary">{{ currentCounter }}</b>/{{ panoramas.length }}
      </div>
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
  watch: {
    panoramas (newValue, oldValue) {
      if (newValue.length < oldValue.length && this.activePanIndex > 0) {
        this.activePanIndex--
      }
      this.$emit('current-panorama', this.panoramas[this.activePanIndex])
    }
  },
  computed: {
    isPanoramaExist () {
      return this.panoramas.length > 0
    },
    currentCounter () {
      return this.activePanIndex + 1
    },
    imgURL () {
      return this.panoramas[this.activePanIndex].viewer_360_file || '/static/img/default-preview.png'
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
        projectId: this.$store.state.project.selectedProject.id,
        ifcId
      }

      this.$router.push({ name: 'viewer', params })
    },
    nextPan () {
      this.activePanIndex++
      this.$emit('current-panorama', this.panoramas[this.activePanIndex])
    },
    prevPan () {
      this.activePanIndex--
      this.$emit('current-panorama', this.panoramas[this.activePanIndex])
    }
  },
  created () {
    this.$emit('current-panorama', this.panoramas[this.activePanIndex])
  }
}
</script>
