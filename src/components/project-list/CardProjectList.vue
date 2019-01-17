<template>
    <div class="card-container">
        <div class="base-card card-item card-bd">
            <div class="card-bd__header">
                <span class="card-bd__date">{{ project.created_at|formatDate(false) }}</span>
                <base-button-option @option-toggled="toggleMenu">
                    <ul>
                        <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
                          {{ $t('project_list.remove') }}
                          <transition name="slide-fade">
                            <div class="delete__actions" v-if="showRemoveActions">
                              <svgicon name="check" @click.native="remove" height="15" width="18" class="check"></svgicon>
                              <svgicon name="close" @click.native="showRemoveActions = false" height="13" width="13" class="check-cross"></svgicon>
                            </div>
                          </transition>
                        </li>
                    </ul>
                </base-button-option>
            </div>
            <div class="card-bd__body">
                <div class="card-bd__body-container">
                    <div class="card-bd__image">
                        <router-link :to="{name: 'project', params: {id: project.id}}">
                            <svgicon name="img-placeholder" height="30" width="30"></svgicon>
                        </router-link>
                    </div>
                    <div v-on-clickaway="closeUpdate"
                         class="card-bd__title"
                         :class="{'card-bd__title--edit-mode': editMode}">
                        <div v-show="!editMode"
                             @click="switchToEditMode">
                            {{ project.name }}
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
    BaseButtonOption
  },
  mixins: [ clickaway ],
  props: {
    project: {
      type: Object,
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
