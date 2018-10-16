<template>
    <div class="col-xl-2 col-lg-3 col-md-4 col-6">
        <div class="base-card project-item card-project-list">
            <div class="card-project-list__header">
                <span class="card-project-list__date">{{ project.created_at|formatDate }}</span>
                <base-button-option>
                    <ul>
                        <li @click="remove">{{ $t('project_list.remove') }}</li>
                    </ul>
                </base-button-option>
            </div>
            <div class="card-project-list__body">
                <div class="card-project-list__body-container">
                    <div class="card-project-list__image">
                        <router-link :to="{name: 'project', params: {id: project.id}}">
                            <svgicon name="img-placeholder" height="30" width="30"></svgicon>
                        </router-link>
                    </div>
                    <div v-on-clickaway="closeUpdate"
                         class="card-project-list__title"
                         :class="{'card-project-list__title--edit-mode': editMode}">
                        <div v-show="!editMode"
                             @click="switchToEditMode">
                            {{ project.name }}
                        </div>
                        <div class="card-project-list__text-container" v-show="editMode">
                            <input ref="updateInput"
                                   type="text"
                                   v-model="newName"
                                   @keyup.enter="submitUpdate"
                                   :placeholder="project.name"/>
                        </div>
                    </div>
                </div>
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
      newName: ''
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
      this.$store.dispatch('removeProject', this.project).then(() => {
      })
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
