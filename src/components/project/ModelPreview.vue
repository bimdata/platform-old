<template>
  <div ref="modelPreview" class="model-preview" @mousemove="mouseHolder">
    <div class="model-image-wrapper">
      <div
        :style="{ left }"
        class="model-image-holder"
      >
        <img src="../../assets/images/model-preview.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageWidth: 15360,
      imageHeight: 1024,
      viewerWidth: 0,
      imageIndex: 0,
      nbSlices: 15
    }
  },
  props: {
    imgURL: {
      type: String,
      required: false,
      default: '../../assets/images/model-preview.png'
    }
  },
  mounted () {
    this.viewerWidth = this.$refs.modelPreview.getBoundingClientRect().width
  },
  computed: {
    left () {
      return `-${(this.imageWidth / this.nbSlices) * this.imageIndex}px`
    }
  },
  methods: {
    mouseHolder ($event) {
      const rect = this.$refs.modelPreview.getBoundingClientRect()
      this.imageIndex = Math.abs(
        Math.ceil(
          this.nbSlices * (
            ($event.clientX - rect.left) /
            rect.width
          )
        )
      ) - 1
    },
    rotate (index) {
      let moving = index - this.sliceCurrentIndex

      if (moving <= 1 && moving >= -1) {
        this.imagePositionState += moving
        this.imagePositionState %= this.nbSlices
        if (this.imagePositionState < 0) {
          this.imagePositionState += this.nbSlices
        }
      }
      this.sliceCurrentIndex = index
    }
  }
}
</script>
<style lang="scss">
.model-preview {
    min-height: 1024px;
    max-width: 1024px;
    position: relative;
}
.model-image-holder {
  position: absolute;
  height: 1024px;
  width: 15360px;
  left: 0;
  top: 0;
  img {
    min-height: 100%;
    min-width: 100%;
  }
}
</style>
