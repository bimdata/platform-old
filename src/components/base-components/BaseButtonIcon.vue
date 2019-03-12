<template>
  <div class="base-button-icon" @click="toggleButton">
    <svgicon :name="iconName" :height="height" :width="width" :class="{'is-close': !isOpen}"></svgicon>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  props: {
    iconName: {
      type: String,
      default: 'magnify'
    },
    height: {
      type: String,
      default: '20'
    },
    width: {
      type: String,
      default: '20'
    }
  },
  methods: {
    toggleButton () {
      this.isOpen = !this.isOpen
      this.$emit('on-click-action', this.isOpen)
    }
  }
}
</script>
