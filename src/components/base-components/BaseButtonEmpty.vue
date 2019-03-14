<template>
    <div class="base-button-empty__container">
        <div class="base-button-empty" v-on="listeners">
            <button class="btn btn-primary">{{ $t('project.upload') }}</button>
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
