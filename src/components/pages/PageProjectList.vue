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
                  <input type="text" required v-model="newProjectName" v-on:keyup.enter="createProject"
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
import BaseSearchBar from '@/components/base-components/BaseSearchBar'
import CardProjectList from '@/components/project-list/CardProjectList'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import _ from 'lodash'

export default {
  data () {
    return {
      selectedCloud: {},
      optionsCloud: [],
      displayNewForm: false,
      newProjectName: '',
      cloud: null,
      searchFilter: ''
    }
  },
  components: {
    BaseButtonAction,
    BaseChoiceList,
    CardProjectList,
    BaseSearchBar
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
