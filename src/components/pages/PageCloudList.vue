<template>
    <div class="page-clouds">
      <div class="toolbar-page row justify-content-center justify-content-sm-between">
        <div class="card-container">
          <div class="choice-list top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud">
            <div class="choice-list__field-selected">
              <span class="choice-list__field-selected__icon">
                <svgicon class="icon" name="cloud" width="20" height="15"></svgicon>
              </span>
              <span class="choice-list__field-selected__text-selected">
                {{ $t('cloud_list.clouds_list') }}
              </span>
            </div>
          </div>
        </div>
        <div class="search-container mt-2 mt-sm-0">
          <base-search-bar @on-search="toSearch" class="m-auto"></base-search-bar>
        </div>
      </div>
      <transition-group
        name="project-item"
        tag="div"
        class="project_list row"
      >
        <!--<div class="card-container" key="new">
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
        </div>-->
        <card-cloud-list
          v-for="cloud in filteredClouds"
          :key="cloud.id"
          :cloud="cloud"
        ></card-cloud-list>
      </transition-group>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CardCloudList from '@/components/cloud-list/CardCloudList'
import BaseSearchBar from '@/components/base-components/BaseSearchBar'

export default {
  components: {
    CardCloudList,
    BaseSearchBar
  },
  data () {
    return {
      searchFilter: ''
    }
  },
  computed: {
    ...mapState({
      clouds: state => state.clouds
    }),
    filteredClouds () {
      let filteredclouds = this.clouds.filter(cloud => {
        return cloud.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
      return filteredclouds
    }
  },
  methods: {
    toSearch (value) {
      this.searchFilter = value
    }
  }
}
</script>
