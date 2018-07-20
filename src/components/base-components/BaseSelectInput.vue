<template>
    <div>
        <b-form-group id="exampleInputGroup3"
                      label="Food:"
                      label-for="exampleInput3">
        <slot>
            <svgicon name="cloud" width="15" height="15"></svgicon>
        </slot>
        <b-form-select class="base-select"
            v-bind="$attrs"
            :options="options"
            v-on="listeners">
        </b-form-select>
        </b-form-group>
    </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    options: Array
  },
  computed: {
    listeners () {
      console.log(this.$listeners)
      return {
        ...this.$listeners
      }
    }
  }
}
</script>
<style lang="scss">
/*.base-select {*/
    /*width: 173px;*/
    /*background-color: #FFFFFF;*/
    /*box-shadow: 0 2px 10px 0 rgba(0,0,0,0.07);*/
    /*font-size: 0.875rem;*/
    /*line-height: 1rem;*/
/*}*/
</style>
