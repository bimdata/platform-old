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
import { mapActions } from 'vuex'
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
  async created () {
    await this.init()
    await this.fetchUserData()
    await this.fetchUserCloudsDetails()
    this.initializedData = true
  },
  methods: {
    ...mapActions({
      init: 'init',
      fetchUserData: 'fetchUserData',
      fetchUserCloudsDetails: 'fetchUserCloudsDetails'
    })
  }
}
</script>
