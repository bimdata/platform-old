<template>
    <div>
        <main-header></main-header>
        <article class="main">
          <div :class="this.$route.meta.container" class="h-100">
            <transition name="slide-fade" mode="out-in">
                <router-view :key="$route.fullPath" v-if="displayPage"></router-view>
                <div class="loader loader-layout" v-else>
                  <p class="loader-layout__text">Loading</p>
                  <div class="lds-dual-ring"></div>
                </div>
            </transition>
          </div>
        </article>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
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
  computed: {
    ...mapState({
      loaderPage: state => state.loaderPage
    }),
    displayPage () {
      return this.initializedData && !this.loaderPage
    }
  },
  async created () {
    await this.init()
    this.$store.commit('SET_LOADER_PAGE', true)
    await this.fetchUserCloudsDetails()
    this.initializedData = true
    this.$store.commit('SET_LOADER_PAGE', false)
  },
  methods: {
    ...mapActions({
      init: 'init',
      fetchUserCloudsDetails: 'fetchUserCloudsDetails'
    })
  }
}
</script>
