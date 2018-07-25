<template>
    <b-btn class="base-button-action"
            v-on="listeners">
        <slot>Button</slot>
    </b-btn>
</template>
<script>
export default {
  props: {
    text: String
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  }
}
</script>
