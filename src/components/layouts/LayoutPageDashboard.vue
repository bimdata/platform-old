<template>
    <div>
        <main-header></main-header>
        <article class="main">
          <div :class="this.$route.meta.container" class="h-100">
            <transition name="slide-fade" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
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
  async beforeCreate () {
    this.$store.dispatch('init')
    let fetchUsers = this.$store.dispatch('fetchUserData')
    let fetchClouds = this.$store.dispatch('fetchUserCloudsDetails')
    // let fetchProjects = this.$store.dispatch('fetchSelfUserProjects')
    await Promise.all([fetchUsers, fetchClouds])
    this.$store.commit('SET_INITIALIZED_DATA', true)
  }
}
</script>
