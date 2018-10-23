<template>
    <div>
        {{ clouds }}
    </div>
</template>
<script>
import { mapState } from 'vuex'
import store from '@/store'

export default {
  methods: {
    beforeRouteEnter (to, from, next) {
      store.dispatch('init')
      let fetchClouds = store.dispatch('fetchUserCloudsDetails')
      let fetchProjects = store.dispatch('fetchSelfUserProjects')
      Promise.all([fetchClouds, fetchProjects]).then(function () {
        next()
      })
    }
  },
  computed: {
    ...mapState({
      clouds: state => state.clouds
    }),
    myClouds () {
      return this.$store.state.clouds
    }
  }
}
</script>
