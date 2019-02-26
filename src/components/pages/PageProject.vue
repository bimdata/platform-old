<template>
  <div class="page-project">
    <div class="toolbar-page row">
      <div class="col-12 d-flex align-items-center">
        <choice-list-cloud
          class="top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud"></choice-list-cloud>
        <choice-list-project
          @selected-project-loaded="loadedProject = true"
          @selected-project-loading="loadedProject = false"
          class="top-toolbar__choice-list-items top-toolbar__choice-list-items--project"
        ></choice-list-project>
        <button-upload-new-file
          class="top-toolbar__button-new-file ml-auto"
          :class="{'active': displayUpload}"
          @click="displayUpload = !displayUpload"
        ></button-upload-new-file>
      </div>
      <div class="col-12 upload-area-container">
        <upload-ifc @upload-complete="closeUploadIfc" v-show="displayUpload"></upload-ifc>
      </div>
    </div>

    <template v-if="loadedProject && loadedDMS">
      <div class="row justify-content-between">
        <div class="content-project">
          <card-project-content></card-project-content>
        </div>
        <div class="user-project">
          <users-list :users="users"></users-list>
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
      <div class="loader loader-layout">
        <p class="loader-layout__text">Loading</p>
        <div class="lds-dual-ring"></div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChoiceListProject from '@/components/project/ChoiceListProject'
import ChoiceListCloud from '@/components/project/ChoiceListCloud'
import ButtonUploadNewFile from '@/components/project/ButtonUploadNewFile'
import CardProjectContent from '@/components/project/CardProjectContent'
import BaseCard from '@/components/base-components/BaseCard'
import TableIfc from '@/components/project/TableIfc'
import UsersList from '@/components/project/UsersList'
import UploadIfc from '@/components/project/UploadIfc'
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
    UsersList,
    'dms': DMS
  },
  data () {
    return {
      loadedProject: false,
      loadedDMS: false,
      displayUpload: false,
      users: [
        {
          id: 1,
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          company: 'Cabinet Marsouin',
          photo: 'https://mir-s3-cdn-cf.behance.net/user/276/df2bfd2271051.59b8e8f49b466.jpg',
          role: 100
        },
        {
          id: 2,
          name: 'Lorem ipsum',
          job: '',
          company: '',
          photo: '',
          role: 25
        },
        {
          id: 3,
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          company: '',
          photo: '',
          role: 50
        },
        {
          id: 4,
          name: 'François Thierry',
          job: '',
          company: '',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          role: 25
        },
        {
          id: 5,
          name: 'Gabriel Cambreling',
          job: 'Chauffagiste',
          company: 'mon entreprise',
          photo: '',
          role: 50
        },
        {
          id: 6,
          name: 'François Thierry',
          job: 'Plombier',
          company: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          role: 25
        },
        {
          id: 7,
          name: 'François Thierry',
          job: 'Architecte',
          company: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          role: 100
        }
      ]
    }
  },
  methods: {
    closeUploadIfc () {
      this.displayUpload = false
    },
    setCurrentCloud () {
      const cloud = this.getCloudById(this.$route.params.cloudId)
      this.$store.commit('SET_CURRENT_CLOUD', cloud)
    },
    setProject () {
      const project = this.$store.getters.getProjectById(this.$route.params.projectId)
      this.$store.dispatch('project/init')
      this.loadedProject = false
      this.$store.commit('project/SET_PROJECT', project)
      this.$store.dispatch('project/getTree', project)
        .then(tree => {
          this.loadedDMS = true
        })
      this.$store.dispatch('project/fetchProjectIfc', project).then(() => {
        this.loadedProject = true
      })
    }
  },
  created () {
    this.setCurrentCloud()
    this.setProject()
  },
  computed: {
    ...mapGetters({
      getCloudById: 'getCloudById'
    })
  }
}
</script>
