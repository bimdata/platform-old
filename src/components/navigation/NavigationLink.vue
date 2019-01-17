<template>
    <router-link
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
    routeName: String
  }
}
</script>
