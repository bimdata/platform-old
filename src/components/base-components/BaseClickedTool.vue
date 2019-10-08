<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <span class="base-button-option__tool" @click="clickedTool" :class="{clicked: clicked}">
    <svgicon :name="iconName" :width="iconWidth" :height="iconHeight" @click.native="clickedToolEvent" :class="iconName"></svgicon>
  </span>
</template>

<script>
export default {
  data () {
    return {
      clicked: false
    }
  },
  props: {
    iconName: {
      type: String,
      default: ''
    },
    iconHeight: {
      type: String,
      default: '22'
    },
    iconWidth: {
      type: String,
      default: '22'
    }
  },
  methods: {
    clickedTool () {
      this.clicked = true
      setTimeout(() => {
        this.clicked = false
      }, 500)
    },
    clickedToolEvent () {
      this.$emit('on-clicked-tool')
    }
  }
}
</script>
