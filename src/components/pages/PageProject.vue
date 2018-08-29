<template>
    <div class="page-project">
        <div class="row">
            <div class="col-12 top-toolbar d-flex align-items-center">
                <choice-list-cloud class="top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud"></choice-list-cloud>
                <choice-list-project class="top-toolbar__choice-list-items top-toolbar__choice-list-items--project"
                                     @selected-project-loading="loadedProject = false"
                                     @selected-project-loaded="loadedProject = true">
                </choice-list-project>
                <button-upload-new-file class="top-toolbar__button-new-file ml-auto"
                                        @click="displayUpload = !displayUpload">
                </button-upload-new-file>
            </div>
            <div class="col-12 d-flex align-items-center justify-content-center">
                <upload-ifc v-show="displayUpload"></upload-ifc>
            </div>
        </div>

            <template v-if="loadedProject">
                <div class="row">
                    <div class="col-12 content-project">
                        <card-project-content></card-project-content>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <table-ifc></table-ifc>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="row">
                    <div class="col-12 content-project">
                        Loading ...
                    </div>
                </div>
            </template>
    </div>
</template>
<script>
import ChoiceListProject from '@/components/project/ChoiceListProject'
import ChoiceListCloud from '@/components/project/ChoiceListCloud'
import ButtonUploadNewFile from '@/components/project/ButtonUploadNewFile'
import CardProjectContent from '@/components/project/CardProjectContent'
import TableIfc from '@/components/project/TableIfc'
import UploadIfc from '@/components/project/UploadIfc'
import store from '@/store'

export default {
  components: {
    UploadIfc,
    ChoiceListCloud,
    ChoiceListProject,
    ButtonUploadNewFile,
    CardProjectContent,
    TableIfc
  },
  data () {
    return {
      loadedProject: true,
      displayUpload: false
    }
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
    this.loadedProject = false
    this.$store.commit('project/SET_PROJECT', project)
    this.$store.dispatch('project/fetchProjectIfc', project).then(() => {
      this.loadedProject = true
    })
    this.$store.commit('project/SET_CLOUD', {id: 2, name: 'GABZZZ'})
  }
}
</script>
