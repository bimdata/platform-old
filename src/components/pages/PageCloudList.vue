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
        <div class="search-container">
          <base-search-bar @on-search="toSearch"></base-search-bar>
        </div>
        <div class="card-container">
          <div class="top-toolbar__choice-list-items">
            <button type="button" class="btn btn-secondary base-button-action top-toolbar__button-new-file" :class="{'active': openCreationCloud}" @click="toggleOpenCreationCloud">
              <svgicon name="add" height="20" width="20"></svgicon>
              Create cloud
            </button>
          </div>
        </div>
      </div>
      <transition-group
        name="card-item"
        tag="div"
        class="project_list row"
      >
        <div class="card-container card-new-cloud" key="new" :class="{'display-card': openCreationCloud}">
          <div class="base-card card-item project-item new-project-item">
            <div
              class="active new-project-item__card-container"
            >
              <div class="new-project-item__picto-container">
                <svgicon name="add" height="45" width="45"></svgicon>
              </div>
              <div class="new-project-item__edit-container">
                <div class="new-project-item__edit-container__header">
                  <span>New cloud</span>
                  <div @click.stop="toggleOpenCreationCloud">
                    <svgicon name="close"
                            height="20"
                            width="20">
                    </svgicon>
                  </div>
                </div>
                <div class="new-project-item__edit-container__body">
                  <div class="base-input-text-material" :class="{'base-input-text-material--error': displayError}">
                    <input type="text" required v-model="newCloudName" @keyup.enter="createCloud" ref="inputToFocus">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>{{ $t('cloud_list.cloud_name') }}</label>
                    <span v-if="displayError" class="base-error-text">{{ emptyValue }}</span>
                  </div>
                </div>
                <div class="new-project-item__edit-container__edit-container__footer">
                  <button type="button" class="btn btn-primary btn-submit" :disabled="isCreatingCloud" @click="createCloud">{{ $t('project_list.submit') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import BaseButtonAction from '@/components/base-components/BaseButtonAction'

export default {
  components: {
    CardCloudList,
    BaseSearchBar,
    BaseButtonAction
  },
  data () {
    return {
      searchFilter: '',
      newCloudName: '',
      openCreationCloud: false,
      isCreatingCloud: false,
      displayError: false,
      creationPending: 0,
      emptyValue: 'This field may not be blank'
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
    },
    toggleOpenCreationCloud () {
      this.openCreationCloud = !this.openCreationCloud
      this.$refs.inputToFocus.focus()
      this.displayError = false
    },
    isValid () {
      if (this.newCloudName.length > 0) {
        return true
      }
      return false
    },
    createCloud () {
      if (this.isValid()) {
        this.creationPending++
        this.displayError = false
        this.isCreatingCloud = true

        if (this.creationPending === 1) {
          this.$store.dispatch('addCloud', this.newCloudName).then(() => {
            this.newCloudName = ''
            this.toggleOpenCreationCloud()
            this.isCreatingCloud = false
            this.creationPending = 0
          })
        }
      } else {
        this.displayError = true
      }
    }
  }
}
</script>
