<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="base-input-radio">
        <input type="radio" :id="`${name}-${id}-${option.value}`" :name="name + id" :value="option.value" :disabled="option.disabled" v-model="radioModel" @click="onSelect">
        <label :disabled="option.disabled" :for="`${name}-${id}-${option.value}`">
          {{ option.text }}
        </label>
    </div>
</template>
<script>
export default {
  data () {
    return {
      radioModel: this.selected
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    name: {
      type: String,
      default: ''
    },
    selected: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onSelect () {
      this.$emit('input', {id: this.id, value: this.option.value, text: this.option.text})
    }
  }
}
</script>
