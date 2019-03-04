<template>
  <div class="base-button-icon">
    <svgicon :name="iconName" :height="height" :width="width" :class="{'is-close': !isOpen}" @click.native="toggleButton"></svgicon>
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
