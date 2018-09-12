<template>
  <div ref="div" class="model-preview">
    <div v-for="(value, index) in nbSlices"
         :key="value"
         @mousemove="rotate(index)"
         class="slice">{{ index }}</div>
    <img :style="{left: -(imagePositionState * 640) + 'px'}" ref="image" src="../../assets/images/model-preview.png"/>
      {{ sliceCurrentIndex }}
  </div>
</template>
<script>
export default {
  data () {
    return {
      nbSlices: 15,
      sliceCurrentIndex: 0,
      imagePositionState: 0
    }
  },
  props: {
    imgURL: {
      type: String,
      required: false,
      default: '../../assets/images/model-preview.png'
    }
  },
  methods: {
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
    display: flex;
    position: relative;
}
.slice {
    min-width: 6.6667%;
    height: 500px;
}
</style>
