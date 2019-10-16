<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="search-component">
    <input type="text" placeholder="search" class="search-input" :class="{'is-close': !isOpen}" v-model="valueToSearch" @input="sendValue">
    <base-button-icon @on-click-action="toggleSearchBar"></base-button-icon>
  </div>
</template>
<script>
import BaseButtonIcon from '@/components/base-components/BaseButtonIcon'

export default {
  components: {
    BaseButtonIcon
  },
  data () {
    return {
      valueToSearch: '',
      isOpen: false
    }
  },
  methods: {
    sendValue () {
      this.$emit('on-search', this.valueToSearch)
    },
    toggleSearchBar (isActive) {
      this.isOpen = isActive
      if (this.isOpen) {
        this.$el.children[0].focus()
      }
    }
  }
}
</script>
