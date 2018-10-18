<template>
    <div class="navigation">
        <navigation-link v-for="(item, index) in items"
                         :key="index"
                         :text="item.textLabel"
                         :routeName="item.routeName">
        </navigation-link>
    </div>
</template>
<script>
import NavigationLink from '@/components/navigation/NavigationLink'

export default {
  components: {
    NavigationLink
  },
  data () {
    return {
      items: [
        {
          routeName: 'home',
          textLabel: 'Home'
        },
        {
          routeName: 'clouds',
          textLabel: 'Cloud'
        },
        {
          routeName: 'viewer',
          textLabel: 'View'
        }
      ]
    }
  }
}
</script>
