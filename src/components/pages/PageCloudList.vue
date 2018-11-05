<template>
    <div class="page-clouds">
        <transition-group name="project-item"
                          tag="div"
                          class="project_list row">
            <card-cloud-list v-for="cloud in myClouds"
                             :key="cloud.id"
                             :cloud="cloud">
            </card-cloud-list>
        </transition-group>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CardCloudList from '@/components/cloud-list/CardCloudList'
import store from '@/store'

export default {
  components: {
    CardCloudList
  },
  methods: {
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('init')
    let fetchClouds = store.dispatch('fetchUserCloudsDetails')
    let fetchProjects = store.dispatch('fetchSelfUserProjects')
    Promise.all([fetchClouds, fetchProjects]).then(function () {
      next()
    })
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
