<template>
    <div class="base-valid-delete">
      <span class="check" @click="validAction">
        <svgicon name="check" height="18" width="18"></svgicon>
      </span>
      <span class="check-cross" @click="cancelAction">
        <svgicon name="close" height="18" width="18"></svgicon>
      </span>
    </div>
</template>
<script>
export default {
  methods: {
    validAction () {
      this.$emit('on-valid-action')
    },
    cancelAction () {
      this.$emit('on-cancel-action')
    }
  }
}
</script>
