<template>
    <div class="navigation">
        <navigation-link
          v-for="(item, index) in items"
          :key="index"
          :text="item.textLabel"
          :routeName="item.routeName"
          :displayLink="item.displayLink"
        ></navigation-link>
    </div>
</template>
<script>
import NavigationLink from '@/components/navigation/NavigationLink'

export default {
  components: {
    NavigationLink
  },
  computed: {
    getNamePage () {
      return this.$route.name
    },
    items () {
      return [
        {
          routeName: 'cloud-list',
          textLabel: 'Cloud',
          displayLink: true
        },
        {
          routeName: 'project-list',
          textLabel: 'Project\'s clouds',
          displayLink: this.getNamePage === 'project'
        }
      ]
    }
  }
}
</script>
