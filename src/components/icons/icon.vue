<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    :fill="iconColor"
    role="presentation"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 20
    },
    height: {
      type: [Number, String],
      default: 20
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    x: {
      type: [Number, String],
      default: 20
    },
    y: {
      type: [Number, String],
      default: 20
    }
  },
  computed: {
    viewBox () {
      return `0 0 ${this.x} ${this.y}`
    }
  }
}
</script>
