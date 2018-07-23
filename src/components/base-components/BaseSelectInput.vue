<template>
    <div>
        <slot>
            <svgicon name="cloud" width="15" height="15"></svgicon>
        </slot>
        <b-form-select class="base-select"
            v-bind="$attrs"
            :options="options"
            v-model="selected"
            v-on="listeners">
        </b-form-select>
    </div>
</template>
<script>
export default {
  inheritAttrs: false,
  data () {
    return {
      selected: null
    }
  },
  props: {
    value: null,
    options: {
      type: Array,
      required: true
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function (newValue) {
        this.selected = newValue
      }
    }
  },
  computed: {
    listeners () {
      console.log(this.$listeners)
      return {
        ...this.$listeners,
        input: event => this.$emit('input', this.selected)
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
