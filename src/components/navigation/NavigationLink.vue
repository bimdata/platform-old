<template>
    <div class="navigation__item">
        <router-link :to="{name: routeName}">{{ text }}</router-link>
    </div>
</template>
<script>
export default {
  props: {
    text: String,
    routeName: String
  }
}
</script>
