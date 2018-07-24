<template>
    <div v-on-clickaway="away" class="choice-list">
        <div class="choice-list__field-selected"
             v-bind="$attrs"
             @click="displayListOptions = !displayListOptions"
             v-on="listeners">
            <span class="choice-list__field-selected__icon">
                <slot>
                    <svgicon class="icon" name="cloud" width="20" height="15"></svgicon>
                </slot>
            </span>
            <span class="choice-list__field-selected__text-selected">
                {{ selected.text }}
            </span>
            <span class="choice-list__field-selected__display-icon">
                <svgicon class="icon" name="chevron-right" width="20" :class="{'svg-right': displayListOptions}"></svgicon>
            </span>
        </div>
        <ul class="choice-list__list-options" v-show="displayListOptions">
            <li v-for="(option, index) in options" :key="index" @click="choice(option)">{{ option.text }}</li>
        </ul>
    </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  inheritAttrs: false,
  mixins: [ clickaway ],
  data () {
    return {
      displayListOptions: false,
      selected: null,
      hasClickedForSearch: false
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
      return {
        ...this.$listeners
      }
    }
  },
  methods: {
    away () {
      this.displayListOptions = false
    },
    choice (option) {
      this.selected = option
      this.$emit('input', option)
      this.$emit('selected-option', option)
      this.displayListOptions = false
    }
  }
}
</script>
