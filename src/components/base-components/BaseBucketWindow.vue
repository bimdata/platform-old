<template>
    <div :class="{ minimize: isMinimize }" class="base-bucket-window">
        <div class="header">
            <span class="label">
              {{ label }}
            </span>
            <div>
              <base-clicked-tool @on-clicked-tool="close" iconName="close" iconWidth="20" iconHeight="20"></base-clicked-tool>
            </div>
            <div>
              <base-clicked-tool @on-clicked-tool="minimize" :iconName="isMinimize ? 'chevron-up' : 'chevron-down'" iconWidth="20" iconHeight="20"></base-clicked-tool>
            </div>
        </div>
        <div class="content">
          <slot name="elements"></slot>
        </div>
    </div>
</template>
<script>
import BaseClickedTool from '@/components/base-components/BaseClickedTool'

export default {
  components: {
    BaseClickedTool
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isMinimize: false
    }
  },
  computed: {
  },
  methods: {
    minimize () {
      this.isMinimize = !this.isMinimize
    },
    close () {

    }
  }
}
</script>
