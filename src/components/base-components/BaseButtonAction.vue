<template>
    <b-btn class="base-button-action"
           :class="{
               'base-button-action--small': size === 'small',
               'base-button-action--fullwidth': size === 'fullwidth',
               'base-button-action--icon-right': iconPosition === 'right'
           }"
            v-on="listeners">
        <svgicon class="base-button-action__icon" v-show="iconName !== undefined" :name="iconName" width="15"></svgicon>
        <span><slot>Button</slot></span>
    </b-btn>
</template>
<script>
export default {
  props: {
    size: String,
    iconPosition: String,
    iconName: String
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
