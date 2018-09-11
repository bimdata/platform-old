<template>
  <div ref="div" class="model-preview"
       @mousemove.stop="rotate"
       @mouseleave.stop="leave"
       >
    <img ref="image" src="../../assets/images/model-preview.png"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      slice: 0,
      startIndex: 0,
      currentIndex: 0
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
    leave (e) {
      this.startIndex = this.currentIndex
    },

    rotate (e) {
      var x = e.clientX - this.$refs.div.getBoundingClientRect().left
      var width = this.$refs.div.offsetWidth
      this.slice = 14 - Math.trunc(x * 15 / width)
      this.currentIndex = this.slice - this.startIndex
      this.currentIndex = this.slice
      if (this.currentIndex < 0) {
        this.currentIndex = 13 + this.currentIndex
      }
      var position = `${this.currentIndex * 640}px`
      this.$refs.image.style.right = position
    }
  }
}
</script>
