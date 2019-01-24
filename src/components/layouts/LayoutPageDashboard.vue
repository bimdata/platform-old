<template>
    <div>
        <main-header></main-header>
        <article class="main">
          <div :class="this.$route.meta.container" class="h-100">
            <transition name="slide-fade" mode="out-in">
                <router-view :key="$route.fullPath" v-if="initializedData"></router-view>
            </transition>
          </div>
        </article>
    </div>
</template>
<script>
import MainHeader from '@/components/navigation/MainHeader'

export default {
  components: {
    'main-header': MainHeader
  },
  data () {
    return {
      initializedData: false
    }
  },
  beforeCreate () {
    this.$store.dispatch('init')
    let fetchUsers = this.$store.dispatch('fetchUserData')
    let fetchClouds = this.$store.dispatch('fetchUserCloudsDetails')
    Promise.all([fetchUsers, fetchClouds]).then(() => {
      this.initializedData = true
    })
  }
}
</script>
