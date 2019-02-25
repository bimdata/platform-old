<template>
    <router-link
      v-if="displayLink"
      :to="{name: routeName}"
      active-class="active"
      class="navigation__item"
      exact
    >
      {{ text }}
    </router-link>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: ''
    },
    displayLink: Boolean
  }
}
</script>
