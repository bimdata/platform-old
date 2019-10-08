<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
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
