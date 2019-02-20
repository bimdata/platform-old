<template>
    <div class="base-button-tool__container">
        <div class="base-button-tool" v-on="listeners">
            <svgicon class="base-button-tool__icon" v-show="iconName !== undefined" :name="iconName" :width="iconWidth" :height="iconHeight"></svgicon>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
  props: {
    iconWidth: {
      type: String,
      default: '18'
    },
    iconHeight: {
      type: String,
      default: '15'
    },
    iconName: {
      type: String,
      default: ''
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
