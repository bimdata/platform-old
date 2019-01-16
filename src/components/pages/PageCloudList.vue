<template>
    <div class="page-clouds">
      <div class="toolbar-page row">
        <div class="col-12 p-0 d-flex align-items-center">
          <div class="card-container">
              <div class="choice-list top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud">
                <div class="choice-list__field-selected">
                  <span class="choice-list__field-selected__icon">
                    <svgicon class="icon" name="cloud" width="20" height="15"></svgicon>
                  </span>
                  <span class="choice-list__field-selected__text-selected">
                      Liste de vos espaces
                  </span>
                </div>
              </div>
          </div>
        </div>
        <div class="ml-auto"></div>
      </div>
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
