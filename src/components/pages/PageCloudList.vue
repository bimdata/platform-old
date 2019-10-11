<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
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
        <div class="class-test">
          <div class="search-container">
            <base-search-bar @on-search="toSearch"></base-search-bar>
          </div>
          <div class="card-container">
              <div class="top-toolbar__choice-list-items">
                <base-button-icon iconName="alphabetic-filter" height="16" width="16" @on-click-action="sortAlphabetically()"></base-button-icon>
              </div>
          </div>
          <div class="card-container">
            <div class="top-toolbar__choice-list-items">
              <button type="button" class="btn base-button-action top-toolbar__button-new-file" :class="{'active': openCreationCloud}" @click="toggleOpenCreationCloud">
                <svgicon name="add" height="20" width="20"></svgicon>
                Create cloud
              </button>
            </div>
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
          v-for="cloud in sortedClouds"
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
import BaseButtonIcon from '@/components/base-components/BaseButtonIcon'
import { sortAlphabetically, SORT_TYPE } from '@/utils/sorts'

export default {
  components: {
    CardCloudList,
    BaseSearchBar,
    BaseButtonAction,
    BaseButtonIcon
  },
  data () {
    return {
      sort: {
        type: SORT_TYPE.DATE,
        ascendant: false
      },
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
      let filteredClouds = this.clouds.filter(cloud => {
        if (!cloud.name) {
          return []
        }
        return cloud.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
      return filteredClouds
    },
    sortedClouds () {
      return sortAlphabetically(this.filteredClouds, this.sort.type, this.sort.ascendant)
    }
  },
  methods: {
    toSearch (value) {
      this.searchFilter = value
    },
    sortAlphabetically () {
      this.sort.type = SORT_TYPE.ALPHABETICALLY
      this.sort.ascendant = !this.sort.ascendant
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
