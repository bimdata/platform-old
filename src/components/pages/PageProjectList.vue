<template>
  <div class="page-projects">
    <div class="toolbar-page row justify-content-center justify-content-sm-between">
      <div class="card-container">
        <base-choice-list
          @input="selectCloud"
          :options="optionsCloud"
          icon="cloud"
          class="top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud"
          :value="selectedCloud"
          v-model="selectedCloud"
        ></base-choice-list>
      </div>
      <div class="class-test">
        <div class="search-container" :class="{'search-container--only': !isAdmin}">
          <base-search-bar @on-search="toSearch"></base-search-bar>
        </div>
        <div class="card-container">
            <div class="top-toolbar__choice-list-items">
              <base-button-icon iconName="alphabetic-filter" height="16" width="16" @on-click-action="sortAlphabetically()"></base-button-icon>
            </div>
        </div>
        <div class="card-container" v-if="isAdmin">
            <div class="top-toolbar__choice-list-items">
              <base-button-icon iconName="add-account" height="16" width="16" @on-click-action="showModal = !showModal" v-if="isAdmin"></base-button-icon>
            </div>
        </div>
      </div>
    </div>
    <transition-group name="card-item" tag="div" class="project_list row">
      <div class="card-container" key="new" v-if="isAdmin">
        <div class="base-card card-item project-item new-project-item">
          <div
            :class="{active: displayNewForm}"
            @click="displayNewForm = true; setFocus()"
            class="new-project-item__card-container"
          >
            <div class="new-project-item__picto-container">
              <svgicon name="add" height="45" width="45"></svgicon>
            </div>
            <div class="new-project-item__edit-container">
              <div class="new-project-item__edit-container__header">
                <span>{{ $t('project_list.new_project') }}</span>
                <div @click.stop="displayNewForm = false; displayError = false;">
                  <svgicon name="close"
                           height="20"
                           width="20">
                  </svgicon>
                </div>
              </div>
              <div class="new-project-item__edit-container__body">
                <div class="base-input-text-material" :class="{'base-input-text-material--error': displayError}">
                  <input type="text" required v-model="newProjectName" @keyup.enter="createProject"
                         ref="inputToFocus">
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>{{ $t('project_list.project_name') }}</label>
                  <span v-if="displayError" class="base-error-text">{{ emptyValue }}</span>
                </div>
              </div>
              <div class="new-project-item__edit-container__edit-container__footer">
                <button type="button" class="btn btn-primary btn-submit" :disabled="isCreatingProject" @click="createProject">{{ $t('project_list.submit') }}</button>
              </div>
            </div>
          </div>
          <p class="new-project-item__title" v-if="!displayNewForm">{{ $t('project_list.new_project') }}</p>
        </div>
      </div>
      <card-project-list
        v-for="(project) in sortedCloudProjects"
        :cloudId="$store.state.currentCloud.id"
        :project="project"
        :key="project.id"
      ></card-project-list>
    </transition-group>

    <b-modal v-model="showModal" centered hide-header hide-footer class="users-list-modal">
      <button type="button" class="close" @click="showModal = false">
        <svgicon name="close" height="20" width="20"></svgicon>
      </button>
      <transition name="fade">
        <template v-if="!showModalUsersList">
          <users-list
            :displayMenu="false"
            :users="usersAdminCloud"
            :hasTriedToInviteInvalidEmail="hasTriedToInviteInvalidEmail"
            :hasTriedToInviteWithoutRights="hasTriedToInviteWithoutRights"
              :level="'cloud'"
            @on-remove-user="removeUser"
            @on-remove-user-pending="removeUserPending"
            @on-remove-error="removeUsersListsErrors"
            class="users-list--large"
          >
            <template slot="header-title">
              {{ $t('users.manage_admin') }}
            </template>
            <template slot="users-list-header">
              <div class="users-list__header users-list__header--large users-list__header__admin users-list__header__invitation">
                <input type="email" v-model="emailInvite" placeholder="Email invitation" @keyup.enter="sendInvitation" class="users-list-modal__input-mail" />
                <div class="rights-select" @click="toggleRightsInvitation">
                  <svgicon name="chevron-down" width="20" height="18" class="arrow-down"></svgicon>
                  <span class="ellipsis">{{ chosenRight.text }}</span>
                  <div class="base-button-option__menu" v-if="displayRightsInvitation" v-on-clickaway="away">
                    <ul>
                      <li v-for="(right, index) in rights" :key="index">
                        <base-input-radio
                          :option="right"
                          :selected="right.selected"
                          name="invitation-rights"
                          @input="setInvitationRight"
                        ></base-input-radio>
                      </li>
                    </ul>
                  </div>
                </div>
                <base-valid-delete @on-valid-action="sendInvitation" @on-cancel-action="emailInvite = ''"></base-valid-delete>
                <base-button-action class="btn btn-primary base-button-action" iconColor="#fff" iconName="account" height="16" width="16" @click="showModalUsersList = true">
                    {{ $t('users.users_list') }}
                </base-button-action>
              </div>
            </template>
          </users-list>
        </template>
        <template v-else>
          <users-list :displayMenu="false" :users="usersNotAdminCloud" :filter="searchUserFilter" @on-remove-user="removeUser" class="users-list--large">
            <template slot="header-title">
              {{ $t('users.users_list') }}
            </template>
            <template slot="users-list-header">
              <div class="users-list__header users-list__header--large">
                <div class="users-list__header__left-container" v-if="!displaySearchUser">
                  <base-clicked-tool @on-clicked-tool="closeModalUsersList" iconName="arrow-back" iconWidth="23" iconHeight="23"></base-clicked-tool>
                </div>
                <div class="users-list__header__right-container" v-if="!displaySearchUser">
                  <base-clicked-tool @on-clicked-tool="openSearchUser" iconName="magnify" iconWidth="21" iconHeight="21"></base-clicked-tool>
                  <base-clicked-tool iconName="filter-variant" iconWidth="25" iconHeight="26" class="d-none"></base-clicked-tool>
                </div>
                <transition name="fade">
                  <div class="users-list__header__search" v-if="displaySearchUser">
                    <div class="users-list__header__left-container">
                      <base-clicked-tool @on-clicked-tool="resetSearchUser" iconName="arrow-back" iconWidth="23" iconHeight="23"></base-clicked-tool>
                    </div>
                    <input type="text" placeholder="Search user" v-model="searchUserFilter">
                  </div>
                </transition>
              </div>
            </template>
          </users-list>
        </template>
      </transition>
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { hasAdminRole } from '@/utils/manageRights'
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
import BaseSearchBar from '@/components/base-components/BaseSearchBar'
import CardProjectList from '@/components/project-list/CardProjectList'
import BaseCard from '@/components/base-components/BaseCard'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseButtonIcon from '@/components/base-components/BaseButtonIcon'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import BaseClickedTool from '@/components/base-components/BaseClickedTool'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'
import UsersList from '@/components/project/UsersList'
import _ from 'lodash'
import Isemail from 'isemail'
import { sortAlphabetically, SORT_TYPE } from '@/utils/sorts'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  data () {
    return {
      sort: {
        type: SORT_TYPE.DATE,
        ascendant: false
      },
      chosenRight: {
        value: 100,
        text: this.$t('users.administrator')
      },
      selectedCloud: {},
      optionsCloud: [],
      displayNewForm: false,
      displaySearchUser: false,
      newProjectName: '',
      emailInvite: '',
      cloud: null,
      searchFilter: '',
      searchUserFilter: '',
      showModal: false,
      showSubmitInvit: false,
      showModalUsersList: false,
      guests: [],
      displayError: false,
      creationPending: 0,
      isCreatingProject: false,
      emptyValue: 'This field may not be blank',
      displayRightsInvitation: false,
      hasTriedToInviteInvalidEmail: false,
      hasTriedToInviteWithoutRights: false
    }
  },
  components: {
    BaseButtonAction,
    BaseChoiceList,
    CardProjectList,
    BaseSearchBar,
    BaseButtonIcon,
    BaseClickedTool,
    BaseInputRadio,
    BaseCard,
    UsersList,
    BaseValidDelete
  },
  computed: {
    ...mapGetters({
      getCloudById: 'getCloudById',
      getProjectsByCloudId: 'getProjectsByCloudId'
    }),
    users () {
      let list = this.$store.state.currentCloud.users ? this.$store.state.currentCloud.users : []
      list.map(user => {
        user.hasAccepted = true
        user.role = user.cloud_role
      })
      return list
    },
    cloudProjects () {
      let cloudId = this.$store.state.currentCloud.id
      let cloudProjects = _.find(this.$store.state.clouds, ['id', cloudId]).projects
      let projects = _.orderBy(cloudProjects, p => p.created_at, 'desc')
      let filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
      return filteredProjects
    },
    sortedCloudProjects () {
      return sortAlphabetically(this.cloudProjects, this.sort.type, this.sort.ascendant)
    },
    usersAdminInvited () {
      let admin = _.filter(this.guests, {role: 100})
      admin.map(user => {
        user.hasAccepted = false
        user.job = ''
        user.company = ''
        user.firstname = ''
        user.lastname = ''
      })
      return admin
    },
    usersAdminCloud () {
      let usersAdmin = _.filter(this.users, {cloud_role: 100})
      return usersAdmin.concat(this.usersAdminInvited).reverse()
    },
    usersNotAdminCloud () {
      let usersNotAdmin = _.filter(this.users, function (u) { return u.cloud_role !== 100 })
      return usersNotAdmin
    },
    isAdmin () {
      return this.hasAdminRole(this.$store.state.currentCloud.role)
    },
    rights () {
      return [
        {
          text: this.$t('users.administrator'),
          selected: 1,
          disabled: false,
          value: 100
        },
        {
          text: this.$t('users.user'),
          selected: 0,
          disabled: true,
          value: 50
        },
        {
          text: this.$t('users.guest'),
          selected: 0,
          disabled: true,
          value: 25
        }
      ]
    }
  },
  methods: {
    hasAdminRole,
    ...mapActions({
      deleteUser: 'deleteCloudUser',
      deleteUserPending: 'deleteCloudUserPending',
      sendCloudInvitation: 'inviteCloudUser'
    }),
    toSearch (value) {
      this.searchFilter = value
    },
    sortAlphabetically () {
      this.sort.type = SORT_TYPE.ALPHABETICALLY
      this.sort.ascendant = !this.sort.ascendant
    },
    resetSearchUser () {
      this.displaySearchUser = false
      this.searchUserFilter = ''
    },
    closeModalUsersList () {
      this.showModalUsersList = false
    },
    selectCloud ({ value: cloudId }) {
      this.$router.push({name: 'project-list', params: {cloudId}})
      const cloud = this.getCloudById(cloudId)
      this.$store.commit('SET_CURRENT_CLOUD', cloud)
    },
    setFocus () {
      this.$refs.inputToFocus.focus()
    },
    isValid () {
      if (this.newProjectName.length > 0) {
        return true
      }
      return false
    },
    createProject () {
      if (this.isValid()) {
        this.creationPending++
        this.displayError = false
        this.isCreatingProject = true

        if (this.creationPending === 1) {
          this.$store.dispatch('addProject', this.newProjectName).then(() => {
            this.newProjectName = ''
            this.displayNewForm = false
            this.creationPending = 0
            this.isCreatingProject = false
            this.displayError = false
          })
        }
      } else {
        this.displayError = true
      }
    },
    emailInviteValid () {
      return Isemail.validate(this.emailInvite)
    },
    removeUsersListsErrors () {
      this.hasTriedToInviteInvalidEmail = false
      this.hasTriedToInviteWithoutRights = false
    },
    away () {
      this.displayRightsInvitation = false
    },
    setInvitationRight (value) {
      this.chosenRight = value
      this.toggleRightsInvitation()
    },
    toggleRightsInvitation () {
      this.displayRightsInvitation = !this.displayRightsInvitation
    },
    openSearchUser () {
      this.displaySearchUser = true
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
      await this.sendCloudInvitation({
        cloudId: this.$route.params.cloudId,
        invite: {
          email: this.emailInvite,
          redirect_uri: `${process.env.BD_APP_URL}/cloud/${this.$route.params.cloudId}`
        }
      })

      this.emailInvite = ''
      if (this.isAdmin) {
        await this.getCloudGuests()
      }
      this.displaySendInvit = false
    },
    async removeUser (userId) {
      const cloudId = this.$store.state.currentCloud.id
      await this.deleteUser({ cloudId, userId })
    },
    async removeUserPending (invitationId) {
      const cloudId = this.$store.state.currentCloud.id
      await this.deleteUserPending({ cloudId, invitationId })
      this.getCloudGuests()
    },
    async getCloudGuests () {
      const cloudId = this.$route.params.cloudId
      this.guests = await this.$store.dispatch('getCloudGuests', cloudId)
    }
  },
  created () {
    this.$store.commit('SET_LOADER_PAGE', true)
    this.$store.dispatch('project/init')
    const clouds = this.$store.state.clouds
    const cloud = clouds.find(cloud => parseInt(cloud.id) === parseInt(this.$route.params.cloudId))
    this.$store.commit('SET_CURRENT_CLOUD', cloud)
    this.cloud = cloud
    const currentCloud = this.$store.state.currentCloud

    for (let {id, name} of clouds) {
      let listItem = {value: id, text: name}
      if (id === currentCloud.id) {
        this.selectedCloud = listItem
      }
      this.optionsCloud.push(listItem)
    }

    if (this.isAdmin) {
      this.getCloudGuests()
    }
    this.$store.commit('SET_LOADER_PAGE', false)
  }
}
</script>
