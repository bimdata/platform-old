<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <span class="base-button-option__tool"
        @click="clickedTool"
        v-on-clickaway="closeTool"
        :class="{clicked: clicked, open: displayMenu === true}">
    <svgicon name="more-options"
             height="23"
             width="23"
             color="transparent #95989A"
             class="m-0">
    </svgicon>
    <div class="base-button-option__menu noselect" v-show="displayMenu">
      <slot>
        <ul>
          <li>default</li>
        </ul>
      </slot>
    </div>
  </span>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  },
  data () {
    return {
      clicked: false,
      displayMenu: false
    }
  },
  methods: {
    closeTool () {
      this.displayMenu = false
      this.$emit('option-toggled', this.displayMenu)
    },
    clickedTool () {
      this.displayMenu = !this.displayMenu
      this.clicked = true
      this.$emit('option-toggled', this.displayMenu)
      setTimeout(() => {
        this.clicked = false
      }, 500)
    }
  }
}
</script>
