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
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  }
}
</script>
