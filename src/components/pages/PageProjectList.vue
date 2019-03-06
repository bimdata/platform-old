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
          <users-list :displayMenu="false" :users="adminUsers">
            <template slot="header-title">
              {{ $t('users.manage_admin') }}
            </template>
            <template slot="users-list-header">
              <div class="users-list__header users-list__header--large users-list__header__admin">
                <svgicon name="account-plus" height="20" width="20" class="account-plus"></svgicon>
                <input type="email" v-model="emailInvit" placeholder="Email invitation" class="users-list-modal__input-mail" />
                <transition name="slide-fade">
                  <base-valid-delete v-if="emailInvitValid" @on-valid-action="sendInvitation" @on-cancel-action="resetEmailInvit"></base-valid-delete>
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
          <users-list :displayMenu="false" :users="nonAdminUsers" :filter="searchUserFilter">
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
      emailInvit: '',
      cloud: null,
      searchFilter: '',
      searchUserFilter: '',
      showModal: false,
      showSubmitInvit: false,
      showModalUsersList: false,
      users: [
        {
          id: 1,
          firstname: 'Gabriel',
          lastname: 'Cambreling',
          job: 'Architecte',
          company: 'Cabinet Marsouin',
          photo: 'https://mir-s3-cdn-cf.behance.net/user/276/df2bfd2271051.59b8e8f49b466.jpg',
          project_role: 100
        },
        {
          id: 2,
          name: 'Lorem ipsum',
          job: '',
          company: '',
          photo: '',
          project_role: 25
        },
        {
          id: 3,
          firstname: 'Gabriel',
          lastname: 'Cambreling',
          job: 'Architecte',
          company: '',
          photo: '',
          project_role: 50
        },
        {
          id: 4,
          firstname: 'François',
          lastname: 'Thierry',
          job: '',
          company: '',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          project_role: 25
        },
        {
          id: 5,
          firstname: 'Gabriel',
          lastname: 'Cambreling',
          job: 'Chauffagiste',
          company: 'mon entreprise',
          photo: '',
          project_role: 50
        },
        {
          id: 6,
          firstname: 'François',
          lastname: 'Thierry',
          job: 'Plombier',
          company: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          project_role: 25
        },
        {
          id: 7,
          firstname: 'François',
          lastname: 'Thierry',
          job: 'Architecte',
          company: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          project_role: 100
        }
      ]
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
      getProjectsByCloudId: 'getProjectsByCloudId',
      getCloudsDetails: 'getCloudsDetails',
      cloudUsers: 'currentCloudUsers'
    }),
    cloudProjects () {
      let cloudId = this.$store.state.currentCloud.id
      let cloudProjects = _.find(this.$store.state.clouds, ['id', cloudId]).projects
      let projects = _.orderBy(cloudProjects, p => p.created_at, 'desc')
      let filteredprojects = projects.filter(project => {
        return project.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
      return filteredprojects
    },
    emailInvitValid () {
      let regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)

      if (regex.test(this.emailInvit)) {
        return true
      }

      return false
    },
    adminUsers () {
      return this.cloudUsers
        .filter(user => user.cloud_role === 100)
        .map(user => ({ ...user, hasAccepted: true }))
    },
    nonAdminUsers () {
      return this.cloudUsers
        .filter(user => user.cloud_role !== 100)
        .map(user => ({ ...user, hasAccepted: true }))
    }
  },
  mounted () {
    this.getCurrentCloudUsers(this.$route.params.cloudId)
  },
  methods: {
    ...mapActions({
      getCurrentCloudUsers: 'getCurrentCloudUsers'
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
    sendInvitation () {
      // TODO call to send invitation to this.emailInvit
    },
    resetEmailInvit () {
      this.emailInvit = ''
    }
  },
  created () {
    this.$store.commit('SET_LOADER_PAGE', true)
    this.$store.dispatch('project/init')
    const clouds = this.getCloudsDetails
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
