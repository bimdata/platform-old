<template>
    <div>
        <input :id="id" type="checkbox" v-bind="$attrs"
               v-on="listeners"
               v-model="selected"
               @click="testa">
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
      type: String
    },
    value: {
      type: Object
    }
  },
  methods: {
    testa () {
      console.log('eeee')
      this.$emit('input', this.value)
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  },
  created () {
    console.log('----')
    console.log(this.value)
  }
}
</script>
