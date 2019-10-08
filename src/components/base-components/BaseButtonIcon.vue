<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
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
