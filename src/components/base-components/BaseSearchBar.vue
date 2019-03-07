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
