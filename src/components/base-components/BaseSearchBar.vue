<template>
  <div class="search-component">
    <input type="text" placeholder="search" class="search-input" :class="{'is-close': !isOpen}" v-model="valueToSearch" @input="sendValue">
    <div class="search-component__icon-container">
      <svgicon name="magnify" height="20" width="20" :class="{'is-close': !isOpen}" @click.native="toggleSearchBar"></svgicon>
    </div>
  </div>
</template>
<script>
export default {
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
    toggleSearchBar () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$el.children[0].focus()
      }
    }
  }
}
</script>
