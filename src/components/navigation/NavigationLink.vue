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
    text: String,
    routeName: String,
    displayLink: Boolean
  }
}
</script>
