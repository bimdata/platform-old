<template>
    <div class="card-container">
        <div class="base-card card-item card-bd card-project">
            <div class="card-bd__header">
                <svgicon name="eye" height="18" width="54"></svgicon>
                <base-button-option @option-toggled="toggleMenu">
                    <ul>
                        <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
                          {{ $t('project_list.remove') }}
                          <transition name="slide-fade">
                            <div class="delete__actions" v-if="showRemoveActions">
                              <span class="check" @click="remove">
                                <svgicon name="check" height="15" width="18"></svgicon>
                              </span>
                              <span class="check-cross" @click="showRemoveActions = false">
                                <svgicon name="close"  height="13" width="13"></svgicon>
                              </span>
                            </div>
                          </transition>
                        </li>
                    </ul>
                </base-button-option>
            </div>
            <router-link :to="{name: 'project', params: {id: project.id}}" class="base-card__link">
                <project-preview
                  :cloudId="cloudId"
                  :projectId="project.id"
                ></project-preview>
                <div class="card-bd__body">
                    <div class="card-bd__body-container">
                        <div v-on-clickaway="closeUpdate"
                            class="card-bd__title"
                            :class="{'card-bd__title--edit-mode': editMode}">
                            <div v-show="!editMode"
                                @click="switchToEditMode">
                                {{ project.name | middle-truncate(25) }}
                            </div>
                            <div class="card-bd__text-container" v-show="editMode">
                                <input ref="updateInput"
                                      type="text"
                                      v-model="newName"
                                      @keyup.enter="submitUpdate"
                                      :placeholder="project.name"/>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
            <div class="loader" v-show="displayLoader">
              <div class="lds-dual-ring"></div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
import { mixin as clickaway } from 'vue-clickaway'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import ProjectPreview from '../project/ProjectPreview'

export default {
  data () {
    return {
      clicked: false,
      displayMenu: false,
      editMode: false,
      newName: '',
      showRemoveActions: false,
      displayLoader: false
    }
  },
  components: {
    ProjectPreview,
    BaseButtonOption
  },
  mixins: [ clickaway ],
  props: {
    project: {
      type: Object,
      required: true
    },
    cloudId: {
      type: Number,
      required: true
    }
  },
  methods: {
    switchToEditMode () {
      this.editMode = true
      this.$nextTick(function () {
        this.$refs.updateInput.focus()
      })
    },
    remove () {
      this.displayLoader = true
      this.$store.dispatch('removeProject', this.project).then(() => {})
    },
    toggleMenu (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = false
      }
    },
    closeTool () {
      this.displayMenu = false
    },
    closeUpdate () {
      this.editMode = false
    },
    submitUpdate () {
      if (this.newName === '' || this.newName === this.project.name) {
        this.newName = ''
        this.editMode = false
      } else {
        this.update(this.newName).then(() => {
          this.newName = ''
          this.editMode = false
        })
      }
    },
    async update (name) {
      let project = _.cloneDeep(this.project)
      project.name = name
      this.$store.dispatch('updateProject', project).then(() => {
        return true
      })
    },
    clickedTool () {
      this.displayMenu = !this.displayMenu
      this.clicked = false
      this.clicked = true
      setTimeout(() => {
        this.clicked = false
      }, 500)
    }
  }
}
</script>
