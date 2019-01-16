<template>
    <div class="page-project">
        <div class="toolbar-page row">
            <div class="col-12 d-flex align-items-center">
                <choice-list-cloud class="top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud"></choice-list-cloud>
                <choice-list-project class="top-toolbar__choice-list-items top-toolbar__choice-list-items--project"
                                     @selected-project-loading="loadedProject = false"
                                     @selected-project-loaded="loadedProject = true">
                </choice-list-project>
                <button-upload-new-file class="top-toolbar__button-new-file ml-auto"
                                        :class="{'active': displayUpload}"
                                        @click="displayUpload = !displayUpload">
                </button-upload-new-file>
            </div>
            <div class="col-12 upload-area-container">
                <upload-ifc @upload-complete="closeUploadIfc" v-show="displayUpload"></upload-ifc>
            </div>
        </div>

        <template v-if="loadedProject && loadedDMS">
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
            <div class="row">
                <div class="col-12">
                  <base-card :fullscreen-available="false" class="ged-card">
                    <template slot="header-title">Project's documents</template>
                    <template slot="content">
                      <dms></dms>
                    </template>
                  </base-card>
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
import BaseCard from '@/components/base-components/BaseCard'
import TableIfc from '@/components/project/TableIfc'
import UploadIfc from '@/components/project/UploadIfc'
import store from '@/store'
import DMS from '@/components/project/DMS'

export default {
  components: {
    UploadIfc,
    ChoiceListCloud,
    ChoiceListProject,
    ButtonUploadNewFile,
    CardProjectContent,
    TableIfc,
    BaseCard,
    'dms': DMS
  },
  data () {
    return {
      loadedProject: false,
      loadedDMS: false,
      displayUpload: false
    }
  },
  methods: {
    closeUploadIfc () {
      this.displayUpload = false
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
    this.$store.dispatch('project/getTree', project).then(tree => {
      this.loadedDMS = true
    })
    this.$store.dispatch('project/fetchProjectIfc', project).then(() => {
      this.loadedProject = true
    })
    this.$store.commit('project/SET_CLOUD', {id: 2, name: 'GABZZZ'})
  }
}
</script>
