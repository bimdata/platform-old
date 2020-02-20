<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="base-button-tool__container">
        <div
          class="base-button-tool"
          v-on="listeners"
          :style="{width: calculatedWidthWithLabel ? `${calculatedWidthWithLabel}px` : '32px'}"
          v-b-tooltip.hover.bottom="tooltipLabel"
        >
            <svgicon class="base-button-tool__icon" v-show="iconName !== undefined" :name="iconName" :width="iconWidth" :height="iconHeight" :style="{marginRight: label !== '' ? '5px' : '0' }"></svgicon>
            <span class="base-button-tool__label">
              {{ label }}
            </span>
        </div>
        <slot></slot>
    </div>
</template>
<script>
import { getTextWidth } from '@/utils/text.js'

export default {
  props: {
    iconWidth: {
      type: String,
      default: '18'
    },
    iconHeight: {
      type: String,
      default: '15'
    },
    iconName: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    tooltipLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },
    calculatedWidthWithLabel () {
      if (this.label !== '') {
        return getTextWidth(this.label, 'roboto', '15pt', 'bold')
      }
      return false
    }
  }
}
</script>
