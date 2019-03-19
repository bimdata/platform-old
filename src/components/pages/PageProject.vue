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
      <div class="row mb-5">
        <div class="col-12 d-flex">
          <div class="content-project">
            <card-project-content></card-project-content>
          </div>
          <div class="user-project">
            <users-list :users="allUsers" :filter="searchFilter" @on-remove-user="removeUser" @on-update-user="updateUser" :class="{'users-list--large': displaySendInvit || displaySearchUser}">
              <template slot="users-list-header">
                <div class="users-list__header">
                  <div class="users-list__header__left-container d-none">
                    <svgicon name="menu" width="23" height="23"></svgicon>
                  </div>
                  <div class="users-list__header__right-container" v-if="!displaySendInvit && !displaySearchUser">
                    <base-clicked-tool @on-clicked-tool="openSendInvite" iconName="add-account" iconWidth="22" iconHeight="22"></base-clicked-tool>
                    <base-clicked-tool @on-clicked-tool="openSearchUser" iconName="magnify" iconWidth="21" iconHeight="21"></base-clicked-tool>
                    <base-clicked-tool iconName="filter-variant" iconWidth="25" iconHeight="26" class="d-none"></base-clicked-tool>
                  </div>
                  <transition name="fade">
                    <div class="users-list__header__invitation" v-if="displaySendInvit">
                      <input type="text" v-model="mailInvitation" @keyup.enter="sendInvitation" placeholder="Email adress">
                      <div class="rights-select" @click="toggleRightsInvitation">
                        <svgicon name="chevron-down" width="20" height="18" class="arrow-down"></svgicon>
                        <span class="ellipsis">{{ chosenRight.text }}</span>
                        <div class="base-button-option__menu" v-if="displayRightsInvitation" v-on-clickaway="away">
                          <ul>
                            <li v-for="(right, index) in rights" :key="index">
                              <base-input-radio
                                :option="right"
                                name="invitation-rights"
                                @input="setInvitationRight"
                              ></base-input-radio>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <base-valid-delete @on-valid-action="sendInvitation" @on-cancel-action="displaySendInvit = false"></base-valid-delete>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="users-list__header__search" v-if="displaySearchUser">
                      <div class="users-list__header__left-container">
                        <base-clicked-tool @on-clicked-tool="resetSearchUser" iconName="arrow-back" iconWidth="23" iconHeight="23"></base-clicked-tool>
                      </div>
                      <input type="text" placeholder="Search user" v-model="searchFilter">
                    </div>
                  </transition>
                </div>
              </template>
            </users-list>
          </div>
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
            <template slot="content" v-if="!hasFiles">
              <upload-file name="upload-file"></upload-file>
            </template>
            <template slot="content" v-else>
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
import { mapActions, mapGetters } from 'vuex'
import ChoiceListProject from '@/components/project/ChoiceListProject'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import ChoiceListCloud from '@/components/project/ChoiceListCloud'
import ButtonUploadNewFile from '@/components/project/ButtonUploadNewFile'
import CardProjectContent from '@/components/project/CardProjectContent'
import BaseCard from '@/components/base-components/BaseCard'
import BaseClickedTool from '@/components/base-components/BaseClickedTool'
import TableIfc from '@/components/project/TableIfc'
import UsersList from '@/components/project/UsersList'
import UploadIfc from '@/components/project/UploadIfc'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'
import DMS from '@/components/project/DMS'
import UploadFile from '@/components/project/UploadFile'
import Isemail from 'isemail'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  components: {
    UploadIfc,
    ChoiceListCloud,
    ChoiceListProject,
    ButtonUploadNewFile,
    CardProjectContent,
    BaseClickedTool,
    TableIfc,
    BaseCard,
    UsersList,
    BaseInputRadio,
    BaseValidDelete,
    UploadFile,
    'dms': DMS
  },
  data () {
    return {
      chosenRight: {
        value: null,
        text: 'Droits'
      },
      rights: [
        {
          text: this.$t('users.administrator'),
          value: 100
        },
        {
          text: this.$t('users.user'),
          value: 50
        },
        {
          text: this.$t('users.guest'),
          value: 25
        }
      ],
      searchFilter: '',
      loadedProject: false,
      loadedDMS: false,
      displayUpload: false,
      displaySendInvit: false,
      displaySearchUser: false,
      displayRightsInvitation: false,
      mailInvitation: ''
    }
  },
  methods: {
    ...mapActions({
      fetchProjectUsers: 'project/fetchProjectUsers',
      projectInvite: 'project/projectInvite',
      updateProjectUserRole: 'project/updateProjectUserRole',
      deleteUser: 'project/deleteProjectUser'
    }),
    emailInviteValid () {
      return Isemail.validate(this.mailInvitation)
    },
    async sendInvitation () {
      if (this.emailInviteValid()) {
        if (this.chosenRight.value) {
          await this.projectInvite({
            project: this.project,
            invite: {
              email: this.mailInvitation,
              role: this.chosenRight.value,
              redirect_uri: `${process.env.BD_APP_URL}/cloud/${this.$route.params.cloudId}/project/${this.$route.params.projectId}`
            }
          })

          this.displaySendInvit = false
        }
      }
    },
    closeUploadIfc () {
      this.displayUpload = false
    },
    away () {
      this.displayRightsInvitation = false
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
    },
    openSendInvite () {
      setTimeout(() => {
        this.displaySearchUser = false
        this.displaySendInvit = true
      }, 500)
    },
    openSearchUser () {
      setTimeout(() => {
        this.displaySendInvit = false
        this.displaySearchUser = true
      }, 500)
    },
    toggleRightsInvitation () {
      this.displayRightsInvitation = !this.displayRightsInvitation
    },
    setInvitationRight (value) {
      this.chosenRight = value
      this.toggleRightsInvitation()
    },
    resetSearchUser () {
      setTimeout(() => {
        this.displaySearchUser = false
        this.searchFilter = ''
      }, 500)
    },
    async removeUser (userId) {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId

      await this.deleteUser({ cloudId, projectId, userId })
      this.fetchProjectUsers(this.project)
    },
    async updateUser (user, right) {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId
      await this.updateProjectUserRole({
        cloudId,
        projectId,
        userId: user.id,
        role: right.value
      })
      this.fetchProjectUsers(this.project)
    },
    async getGuests () {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId
      await this.$store.dispatch('project/getProjectGuests', { cloudId, projectId })
    },
    isAdmin () {
      if (this.$store.state.project.selectedProject !== null) {
        if (this.$store.state.project.selectedProject.role === 100) {
          return true
        }
      } else {
        if (this.$store.state.currentCloud.role === 100) {
          return true
        }
      }

      return false
    }
  },
  mounted () {
    this.fetchProjectUsers(this.project)
    if (this.isAdmin()) {
      this.getGuests()
    }
  },
  created () {
    this.setCurrentCloud()
    this.setProject()
  },
  computed: {
    ...mapGetters({
      getCloudById: 'getCloudById',
      getProjectById: 'getProjectById'
    }),
    project () {
      return this.getProjectById(this.$route.params.projectId)
    },
    users () {
      let list = this.$store.state.project.users
      list.map(user => {
        user.hasAccepted = true
        user.role = user.project_role
      })
      return list
    },
    usersInvited () {
      let list = this.$store.state.project.guests ? this.$store.state.project.guests : []
      list.map(user => {
        user.hasAccepted = false
        user.job = ''
        user.company = ''
        user.firstname = ''
        user.lastname = ''
      })
      return list
    },
    allUsers () {
      return this.users.concat(this.usersInvited).reverse()
    },
    hasFiles () {
      let tree = this.$store.state.project.tree
      return tree.children.length > 0
    }
  }
}
</script>
