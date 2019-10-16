<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <b-btn class="base-button-action"
           :class="{
               'base-button-action--small': size === 'small',
               'base-button-action--fullwidth': size === 'fullwidth',
               'base-button-action--icon-right': iconPosition === 'right'
           }"
            v-on="listeners">
        <svgicon class="base-button-action__icon" v-show="iconName" :name="iconName" :width="iconWidth" :height="iconHeight" :color="iconColor"></svgicon>
        <span><slot>Button</slot></span>
    </b-btn>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'left'
    },
    iconWidth: {
      type: String,
      default: '15'
    },
    iconHeight: {
      type: String,
      default: '15'
    },
    iconName: {
      type: String,
      default: 'add'
    },
    iconColor: {
      type: String,
      default: '#2f374a'
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
