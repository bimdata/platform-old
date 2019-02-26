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
        <base-button-icon iconName="user-croix" height="16" width="16" @on-click-action="showModal = !showModal" class="ml-2"></base-button-icon>
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

    <b-modal v-model="showModal" centered hide-header hide-footer>
      <button type="button" class="close" @click="showModal = false">x</button>
      <template v-if="!showModalUsersList">
        <users-list :displayMenu="false" :users="users">
          <template slot="header-title">
            {{ $t('users.manage_admin') }}
          </template>
          <template slot="users-list-header">
            MON HEADER ADMINISTRATEURS
          </template>
        </users-list>
      </template>
      <template v-else>
        <users-list :displayMenu="false" :users="users">
          <template slot="header-title">
            {{ $t('users.users_list') }}
          </template>
          <template slot="users-list-header">
            MON HEADER UTILISATEURS
          </template>
        </users-list>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
import BaseSearchBar from '@/components/base-components/BaseSearchBar'
import CardProjectList from '@/components/project-list/CardProjectList'
import BaseCard from '@/components/base-components/BaseCard'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseButtonIcon from '@/components/base-components/BaseButtonIcon'
import UsersList from '@/components/project/UsersList'
import _ from 'lodash'

export default {
  data () {
    return {
      selectedCloud: {},
      optionsCloud: [],
      displayNewForm: false,
      newProjectName: '',
      cloud: null,
      searchFilter: '',
      showModal: false,
      showModalUsersList: false,
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
  components: {
    BaseButtonAction,
    BaseChoiceList,
    CardProjectList,
    BaseSearchBar,
    BaseButtonIcon,
    BaseCard,
    UsersList
  },
  computed: {
    ...mapGetters({
      currentCloud: 'getCurrentCloud',
      getCloudById: 'getCloudById',
      getProjectsByCloudId: 'getProjectsByCloudId',
      getCloudsDetails: 'getCloudsDetails'
    }),
    cloudProjects () {
      let cloudId = this.$store.state.currentCloud.id
      let cloudProjects = _.find(this.$store.state.clouds, ['id', cloudId]).projects
      let projects = _.orderBy(cloudProjects, p => p.created_at, 'desc')
      let filteredprojects = projects.filter(project => {
        return project.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
      return filteredprojects
    }
  },
  methods: {
    toSearch (value) {
      this.searchFilter = value
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
