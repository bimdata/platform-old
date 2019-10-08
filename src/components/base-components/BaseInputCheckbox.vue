<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div>
        <input :id="id" type="checkbox" v-bind="$attrs"
               v-on="listeners"
               v-model="selected"
               @click="onClick">
        <label :for="id">test</label>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selected: false
    }
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onClick () {
      this.$emit('input', this.value)
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
