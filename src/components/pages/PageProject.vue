<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
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
          v-if="isUserRole"
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
            <card-project-content :role="passRole"></card-project-content>
          </div>
          <div class="user-project">
            <users-list
              :users="allUsers"
              :filter="searchFilter"
              :hasTriedToInviteInvalidEmail="hasTriedToInviteInvalidEmail"
              :hasTriedToInviteWithoutRights="hasTriedToInviteWithoutRights"
              :level="'project'"
              @on-remove-user="removeUser"
              @on-remove-user-pending="removeUserPending"
              @on-update-user="updateUser"
              @on-remove-error="removeUsersListsErrors"
              :class="{'users-list--large': displaySendInvit || displaySearchUser}"
            >
              <template slot="users-list-header">
                <div class="users-list__header">
                  <div class="users-list__header__left-container d-none">
                    <svgicon name="menu" width="23" height="23"></svgicon>
                  </div>
                  <div class="users-list__header__right-container" v-if="!displaySendInvit && !displaySearchUser">
                    <base-clicked-tool v-if="isUserRole" @on-clicked-tool="openSendInvite" iconName="add-account" iconWidth="20" iconHeight="20"></base-clicked-tool>
                    <base-clicked-tool @on-clicked-tool="openSearchUser" iconName="magnify" iconWidth="20" iconHeight="20"></base-clicked-tool>
                    <base-clicked-tool iconName="filter-variant" iconWidth="20" iconHeight="20" class="d-none"></base-clicked-tool>
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
          <table-ifc :role="passRole"></table-ifc>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-card :fullscreen-available="false" class="ged-card">
            <template slot="header-title">{{ $t('project.project_document') }}</template>
            <template slot="content" v-if="!hasFiles">
              <img src="../../../src/assets/images/illu-file.svg" >
              <upload-file :text="$t('project.file')" name="gedcard" :role="passRole"></upload-file>
            </template>
            <template slot="content" v-else>
              <dms :role="passRole"></dms>
            </template>
          </base-card>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="loader-platform loader-layout">
        <p class="loader-platform-layout__text">{{ $t('project.loading') }}</p>
        <div class="lds-dual-ring"></div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { hasAdminRole, hasUserRole } from '@/utils/manageRights'
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
import IsEmail from 'isemail'
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
        text: this.$t('rights')
      },
      searchFilter: '',
      loadedProject: false,
      loadedDMS: false,
      displayUpload: false,
      displaySendInvit: false,
      displaySearchUser: false,
      displayRightsInvitation: false,
      mailInvitation: '',
      hasTriedToInviteInvalidEmail: false,
      hasTriedToInviteWithoutRights: false
    }
  },
  methods: {
    hasUserRole,
    hasAdminRole,
    ...mapActions({
      fetchProjectUsers: 'project/fetchProjectUsers',
      projectInvite: 'project/projectInvite',
      updateProjectUserRole: 'project/updateProjectUserRole',
      deleteUser: 'project/deleteProjectUser',
      deleteUserPending: 'project/deleteUserPending'
    }),
    emailInviteValid () {
      return IsEmail.validate(this.mailInvitation)
    },
    async sendInvitation () {
      if (!this.emailInviteValid()) {
        this.hasTriedToInviteInvalidEmail = true
        setTimeout(() => (this.hasTriedToInviteInvalidEmail = false), 3000)
        return false
      } else if (!this.chosenRight.value) {
        this.hasTriedToInviteWithoutRights = true
        setTimeout(() => (this.hasTriedToInviteWithoutRights = false), 3000)
        return false
      }
      await this.projectInvite({
        project: this.project,
        invite: {
          email: this.mailInvitation,
          role: this.chosenRight.value,
          redirect_uri: `${process.env.BD_APP_URL}/cloud/${this.$route.params.cloudId}/project/${this.$route.params.projectId}`
        }
      })

      this.mailInvitation = ''
      if (this.isAdmin) {
        this.getGuests()
      }
      this.displaySendInvit = false
    },
    removeUsersListsErrors () {
      this.hasTriedToInviteInvalidEmail = false
      this.hasTriedToInviteWithoutRights = false
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
      this.displaySearchUser = false
      this.displaySendInvit = true
    },
    openSearchUser () {
      this.displaySendInvit = false
      this.displaySearchUser = true
    },
    toggleRightsInvitation () {
      this.displayRightsInvitation = !this.displayRightsInvitation
    },
    setInvitationRight (value) {
      this.chosenRight = value
      this.toggleRightsInvitation()
    },
    resetSearchUser () {
      this.displaySearchUser = false
      this.searchFilter = ''
    },
    async removeUser (userId) {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId

      await this.deleteUser({ cloudId, projectId, userId })
      this.fetchProjectUsers(this.project)
    },
    async removeUserPending (invitationId) {
      const cloudPk = this.$route.params.cloudId
      const projectPk = this.$route.params.projectId
      const id = invitationId

      await this.deleteUserPending({ cloudPk, projectPk, id })
      this.getGuests()
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
    }
  },
  mounted () {
    this.fetchProjectUsers(this.project)
    if (this.isAdmin) {
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
    },
    isAdmin () {
      if (this.$store.state.project.selectedProject !== null) {
        return this.hasAdminRole(this.$store.state.project.selectedProject.role)
      } else {
        return this.hasAdminRole(this.$store.state.currentCloud.role)
      }
    },
    isUserRole () {
      if (this.$store.state.project.selectedProject !== null) {
        return this.hasUserRole(this.$store.state.project.selectedProject.role)
      } else {
        return this.hasUserRole(this.$store.state.currentCloud.role)
      }
    },
    passRole () {
      if (this.$store.state.project.selectedProject !== null) {
        return this.$store.state.project.selectedProject.role
      } else {
        return this.$store.state.currentCloud.role
      }
    },
    rights () {
      if (this.isAdmin) {
        return [
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
        ]
      } else {
        return [
          {
            text: this.$t('users.user'),
            value: 50
          },
          {
            text: this.$t('users.guest'),
            value: 25
          }
        ]
      }
    }
  }
}
</script>
