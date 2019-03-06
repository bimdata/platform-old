<template>
  <div class="page-project">
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
      <div class="search-container mt-2 mt-sm-0">
        <base-search-bar @on-search="toSearch" class="m-auto"></base-search-bar>
        <base-button-icon iconName="account-plus" height="16" width="16" @on-click-action="showModal = !showModal" class="ml-2"></base-button-icon>
      </div>
    </div>
    <transition-group name="card-item" tag="div" class="project_list row">
      <div class="card-container" key="new">
        <div class="base-card card-item project-item new-project-item">
          <div
            :class="{active: displayNewForm}"
            @click="displayNewForm = true; setFocus()"
            class="new-project-item__card-container"
          >
            <div class="new-project-item__picto-container">
              <svgicon name="plus" height="45" width="45"></svgicon>
            </div>
            <div class="new-project-item__edit-container">
              <div class="new-project-item__edit-container__header">
                <span>{{ $t('project_list.new_project') }}</span>
                <div @click.stop="displayNewForm = false">
                  <svgicon name="close"
                           height="20"
                           width="20">
                  </svgicon>
                </div>
              </div>
              <div class="new-project-item__edit-container__body">
                <div class="base-input-text-material">
                  <input type="text" required v-model="newProjectName" @keyup.enter="createProject"
                         ref="inputToFocus">
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>{{ $t('project_list.project_name') }}</label>
                </div>
              </div>
              <div class="new-project-item__edit-container__edit-container__footer">
                <base-button-action @click="createProject">{{ $t('project_list.submit') }}</base-button-action>
              </div>
            </div>
          </div>
          <p class="new-project-item__title" v-if="!displayNewForm">{{ $t('project_list.new_project') }}</p>
        </div>
      </div>
      <card-project-list
        v-for="(project) in cloudProjects"
        :cloudId="currentCloud.id"
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
          <users-list :displayMenu="false" :users="usersAdminCloud" @on-remove-user="removeUser">
            <template slot="header-title">
              {{ $t('users.manage_admin') }}
            </template>
            <template slot="users-list-header">
              <div class="users-list__header users-list__header--large users-list__header__admin">
                <svgicon name="account-plus" height="20" width="20" class="account-plus"></svgicon>
                <input type="email" v-model="emailInvite" placeholder="Email invitation" class="users-list-modal__input-mail" />
                <transition name="slide-fade">
                  <base-valid-delete v-if="emailInviteValid" @on-valid-action="sendInvitation" @on-cancel-action="resetEmailInvite"></base-valid-delete>
                </transition>
                <button type="button" class="btn base-button-action" @click="showModalUsersList = true">
                  <svgicon name="account" height="12" width="12"></svgicon>
                  {{ $t('users.users') }}
                </button>
              </div>
            </template>
          </users-list>
        </template>
        <template v-else>
          <users-list :displayMenu="false" :users="usersNotAdminCloud" :filter="searchUserFilter" @on-remove-user="removeUser">
            <template slot="header-title">
              {{ $t('users.users_list') }}
            </template>
            <template slot="users-list-header">
              <div class="users-list__header">
                <div class="users-list__header__left-container">
                  <svgicon name="arrow-back" width="23" height="23" @click="showModalUsersList = false"></svgicon>
                </div>
                <div class="users-list__header__right-container" v-if="!displaySearchUser">
                  <base-clicked-tool @on-clicked-tool="openSearchUser" iconName="magnify" iconWidth="21" iconHeight="21"></base-clicked-tool>
                  <base-clicked-tool iconName="filter-variant" iconWidth="25" iconHeight="26" class="d-none"></base-clicked-tool>
                </div>
                <transition name="fade">
                  <div class="users-list__header__search" v-if="displaySearchUser">
                    <input type="text" placeholder="Search user" v-model="searchUserFilter">
                    <div class="users-list__header__invitation__actions">
                      <span class="check-cross" @click="resetSearchUser">
                        <svgicon name="close" height="21" width="21"></svgicon>
                      </span>
                    </div>
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
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
import BaseSearchBar from '@/components/base-components/BaseSearchBar'
import CardProjectList from '@/components/project-list/CardProjectList'
import BaseCard from '@/components/base-components/BaseCard'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseButtonIcon from '@/components/base-components/BaseButtonIcon'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import BaseClickedTool from '@/components/base-components/BaseClickedTool'
import UsersList from '@/components/project/UsersList'
import _ from 'lodash'

export default {
  data () {
    return {
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
      showModalUsersList: false
    }
  },
  components: {
    BaseButtonAction,
    BaseChoiceList,
    CardProjectList,
    BaseSearchBar,
    BaseButtonIcon,
    BaseClickedTool,
    BaseCard,
    UsersList,
    BaseValidDelete
  },
  computed: {
    ...mapGetters({
      currentCloud: 'getCurrentCloud',
      getCloudById: 'getCloudById',
      getProjectsByCloudId: 'getProjectsByCloudId'
    }),
    users () {
      let list = this.$store.state.currentCloud.users
      list.map(user => {
        user.hasAccepted = true
      })
      return list
    },
    cloudProjects () {
      let cloudId = this.$store.state.currentCloud.id
      let cloudProjects = _.find(this.$store.state.clouds, ['id', cloudId]).projects
      let projects = _.orderBy(cloudProjects, p => p.created_at, 'desc')
      let filteredprojects = projects.filter(project => {
        return project.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
      return filteredprojects
    },
    emailInviteValid () {
      return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.emailInvite)
    },
    usersAdminCloud () {
      let usersAdmin = _.filter(this.users, {cloud_role: 100})
      usersAdmin.map(user => {
        user.role = user.cloud_role
      })
      return usersAdmin
    },
    usersNotAdminCloud () {
      let usersNotAdmin = _.filter(this.users, function (u) { return u.cloud_role !== 100 })
      usersNotAdmin.map(user => {
        user.role = user.cloud_role
      })
      return usersNotAdmin
    }
  },
  methods: {
    ...mapActions({
      deleteUser: 'deleteCloudUser',
      fetchUserCloudsDetails: 'fetchUserCloudsDetails',
      sendCloudInvitation: 'inviteCloudUser'
    }),
    toSearch (value) {
      this.searchFilter = value
    },
    resetSearchUser () {
      this.displaySearchUser = false
      this.searchUserFilter = ''
    },
    selectCloud ({ value: cloudId }) {
      this.$router.push({name: 'project-list', params: {cloudId}})
      const cloud = this.getCloudById(cloudId)
      this.$store.commit('SET_CURRENT_CLOUD', cloud)
    },
    setFocus () {
      this.$refs.inputToFocus.focus()
    },
    createProject () {
      this.$store.dispatch('addProject', this.newProjectName).then(() => {
        this.newProjectName = ''
        this.displayNewForm = false
      })
    },
    openSearchUser () {
      setTimeout(() => {
        this.displaySearchUser = true
      }, 500)
    },
    async sendInvitation () {
      await this.sendCloudInvitation({
        cloudId: this.$route.params.cloudId,
        invite: {
          email: this.emailInvite,
          redirect_uri: `${process.env.BD_APP_URL}/cloud/${this.$route.params.cloudId}`
        }
      })
      this.resetEmailInvite()
    },
    resetEmailInvite () {
      this.emailInvite = ''
    },
    resetEmailInvit () {
      this.emailInvit = ''
    },
    async removeUser (userId) {
      const cloudId = this.$store.state.currentCloud.id

      await this.deleteUser({ cloudId, userId })
      this.fetchUserCloudsDetails()
    }
  },
  created () {
    this.$store.commit('SET_LOADER_PAGE', true)
    this.$store.dispatch('project/init')
    const clouds = this.$store.state.clouds
    const cloud = clouds.find(cloud => parseInt(cloud.id) === parseInt(this.$route.params.cloudId))
    this.$store.commit('SET_CURRENT_CLOUD', cloud)
    this.cloud = cloud
    const currentCloud = this.$store.getters['getCurrentCloud']

    for (let {id, name} of clouds) {
      let listItem = {value: id, text: name}
      if (id === currentCloud.id) {
        this.selectedCloud = listItem
      }
      this.optionsCloud.push(listItem)
    }

    this.$store.commit('SET_LOADER_PAGE', false)
  }
}
</script>
