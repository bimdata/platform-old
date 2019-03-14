<template>
    <b-btn class="base-button-action"
           :class="{
               'base-button-action--small': size === 'small',
               'base-button-action--fullwidth': size === 'fullwidth',
               'base-button-action--icon-right': iconPosition === 'right'
           }"
            v-on="listeners">
        <svgicon class="base-button-action__icon" v-show="iconName" :name="iconName" :width="iconWidth" :height="iconHeight"></svgicon>
        <span><slot>Button</slot></span>
    </b-btn>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'left'
    },
    iconWidth: {
      type: String,
      default: '15'
    },
    iconHeight: {
      type: String,
      default: '15'
    },
    iconName: {
      type: String,
      default: 'add'
    }
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
