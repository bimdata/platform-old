<template>
    <div class="page-project">
        <div class="row">
            <div class="col-12 top-toolbar d-flex align-items-center">
                <choice-list-cloud class="top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud"></choice-list-cloud>
                <choice-list-project class="top-toolbar__choice-list-items top-toolbar__choice-list-items--project"
                                     @selected-project-loading="loadedProject = false"
                                     @selected-project-loaded="loadedProject = true">
                </choice-list-project>
                <button-upload-new-file class="top-toolbar__button-new-file ml-auto"></button-upload-new-file>
            </div>
        </div>
        <div class="row">
            <div class="col-12 content-project" v-if="loadedProject">
                <card-project-content></card-project-content>
            </div>
            <div class="col-12 content-project" v-else>
                Loading ...
            </div>
        </div>
    </div>
</template>
<script>
import ChoiceListProject from '@/components/project/ChoiceListProject'
import ChoiceListCloud from '@/components/project/ChoiceListCloud'
import ButtonUploadNewFile from '@/components/project/ButtonUploadNewFile'
import CardProjectContent from '@/components/project/CardProjectContent'

import store from '@/store'

export default {
  components: {
    ChoiceListCloud,
    ChoiceListProject,
    ButtonUploadNewFile,
    CardProjectContent
  },
  data () {
    return {
      loadedProject: true
    }
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
  created () {
    let project = this.$store.getters.getProjectById(this.$route.params.id)
    this.$store.dispatch('project/init')
    this.$store.commit('project/SET_PROJECT', project)
    this.$store.commit('project/SET_CLOUD', {id: 3, name: '__test__'})
  }
}
</script>
