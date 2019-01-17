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
      viewerHeight: 0,
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
    this.viewerWidth = this.viewerHeight = this.$refs.modelPreview.getBoundingClientRect().width
  },
  computed: {
    left () {
      return `-${((this.imageWidth / this.nbSlices) * this.imageIndex) * (this.viewerHeight / this.imageHeight)}px`
    }
  },
  methods: {
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
