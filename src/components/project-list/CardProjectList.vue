<template>
  <div class="card-container">
    <div class="base-card card-item card-bd card-project noselect">
      <div class="card-bd__header">
        <svgicon name="eye" height="18" width="54" @click.native="viewModel" v-if="displayEye" class="icon-eye"></svgicon>
        <base-button-option ref="menu" @option-toggled="toggleMenu" v-if="hasAdminRole(project.role)">
          <ul>
            <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
              {{ $t('project_list.remove') }}
              <transition name="slide-fade">
                <base-valid-delete v-if="showRemoveActions" @on-valid-action="remove" @on-cancel-action="showRemoveActions = false"></base-valid-delete>
              </transition>
            </li>
            <li @click.stop.self="toggleRename()" :class="{'actif': displayRename}">
              {{ $t('project.rename') }}

              <div class="new_folder_box rename" v-if="displayRename">
                <div class="new_folder_box__title">
                  {{ $t('project_list.rename_project') }}
                </div>
                <div class="base-input-text-material">
                  <input
                    :ref="`rename-${project.id}`"
                    type="text"
                    autofocus
                    :placeholder="project.name"
                    required
                    v-model="renameProject"
                    @keyup.enter="saveRename"
                  >
                  <span class="highlight"></span>
                  <span class="bar"></span>
                </div>
                <div class="new_folder_box__button-validation">
                  <span @click="cancelRename">{{ $t('project.cancel') }}</span>
                  <span @click="saveRename">{{ $t('project.validate') }}</span>
                </div>
              </div>
            </li>
          </ul>
        </base-button-option>
      </div>
      <router-link :to="{name: 'project', params: {cloudId: cloudId, projectId: project.id}}" class="base-card__link">
        <project-preview
          :cloudId="cloudId"
          :projectId="project.id"
          @has-image="displayPreviewFonctionnality"
        ></project-preview>
        <div class="card-bd__body">
          <div class="card-bd__body-container">
            <div v-on-clickaway="closeUpdate"
              class="card-bd__title"
              :class="{'card-bd__title--edit-mode': editMode}">
              <div v-show="!editMode"
                @click="switchToEditMode">
                <span v-if="project.name && project.name.length > 25" v-b-tooltip.hover :title="project.name">{{ project.name | middle-truncate(25) }}</span>
                <span v-else>{{ project.name }}</span>
              </div>
              <div class="card-bd__text-container" v-show="editMode">
                <input
                    ref="updateInput"
                    type="text"
                    v-model="newName"
                    @keyup.enter="submitUpdate"
                    :placeholder="project.name"
                />
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
import { hasAdminRole } from '@/utils/manageRights'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import ProjectPreview from '../project/ProjectPreview'

export default {
  data () {
    return {
      clicked: false,
      displayMenu: false,
      editMode: false,
      newName: '',
      showRemoveActions: false,
      displayLoader: false,
      displayEye: false,
      ifcImage: null,
      renameProject: '',
      displayRename: false
    }
  },
  components: {
    ProjectPreview,
    BaseButtonOption,
    BaseValidDelete
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
    hasAdminRole,
    toggleRename () {
      this.displayRename = !this.displayRename
      this.showRemoveActions = false
      this.renameProject = this.project.name
      this.$nextTick(() => {
        this.$refs[`rename-${this.project.id}`].focus()
        this.$refs[`rename-${this.project.id}`].setSelectionRange(0, this.renameProject.length)
      })
    },
    saveRename () {
      this.$store.dispatch('project/updateProjectName', {cloudPk: this.$store.state.currentCloud.id, id: this.project.id, name: this.renameProject})
      this.$refs.menu.displayMenu = false
      this.toggleMenuAction(false)
    },
    toggleMenuAction (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = isOpened
        this.displayRename = isOpened
      }
    },
    cancelRename () {
      this.displayRename = false
    },
    displayPreviewFonctionnality (idIfc) {
      this.ifcImage = idIfc
      this.displayEye = true
    },
    viewModel () {
      const params = {
        cloudId: this.$store.state.currentCloud.id,
        projectId: this.project.id,
        ifcId: this.ifcImage
      }

      this.$router.push({ name: 'viewer', params })
    },
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
