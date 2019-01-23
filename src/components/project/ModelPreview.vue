<template>
  <div
    ref="modelPreview"
    class="model-preview"
    v-if="imgURL"
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
        <img :src="imgURL" alt="">
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
      required: true
    }
  },
  mounted () {
    this.viewerWidth = this.viewerHeight =
      this.$refs.modelPreview.getBoundingClientRect().width
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
    }
  }
}
</script>
