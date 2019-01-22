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
import _ from 'lodash'

export default {
  components: {
    CardCloudList
  },
  data () {
    return {
      usersByCloud: []
    }
  },
  methods: {
    getNbUsersByCloud () {
      this.$store.state.clouds.forEach((elt) => {
        this.$store.dispatch('getCloudUsers', elt.id).then((result) => {
          this.usersByCloud.push({
            id: elt.id,
            nbUsers: result
          })
        })
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('init')
    let fetchUser = store.dispatch('fetchUserData')
    let fetchClouds = store.dispatch('fetchUserCloudsDetails')
    let fetchProjects = store.dispatch('fetchSelfUserProjects')
    Promise.all([fetchUser, fetchClouds, fetchProjects]).then(function () {
      next()
    })
  },
  created () {
    this.getNbUsersByCloud()
  },
  computed: {
    ...mapState({
      clouds: state => state.clouds
    }),
    myClouds () {
      this.$store.state.clouds.forEach((elt) => {
        let role = this.$store.state.currentUser.clouds.find((idCloud) => {
          return idCloud.cloud === elt.id
        })
        if (_.find(this.usersByCloud, ['id', elt.id]) !== undefined) {
          elt.nbUsers = _.find(this.usersByCloud, ['id', elt.id]).nbUsers
        } else {
          elt.nbUsers = 0
        }

        elt.isAdmin = role.role === 100
      })
      return this.$store.state.clouds
    }
  }
}
</script>
