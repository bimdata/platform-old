<template>
    <div class="card-container">
        <div class="base-card card-item card-bd">
            <div class="card-bd__header">
                <base-button-option @option-toggled="toggleMenu" v-if="cloud.isAdmin">
                    <ul>
                        <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
                          {{ $t('project_list.remove') }}
                          <transition name="slide-fade">
                            <div class="delete__actions" v-if="showRemoveActions">
                              <span class="check" @click.native="remove">
                                <svgicon name="check" height="15" width="18"></svgicon>
                              </span>
                              <span class="check-cross" @click.native="showRemoveActions = false">
                                <svgicon name="close"  height="13" width="13"></svgicon>
                              </span>
                            </div>
                          </transition>
                        </li>
                    </ul>
                </base-button-option>
            </div>
            <div class="card-bd__body">
                <div class="card-bd__body-container">
                    <div class="card-bd__circle" @click.prevent="accessCloud">
                        <div class="card-bd__picto-container">
                            <svgicon name="image-plus" height="26" width="26"></svgicon>
                        </div>
                        <img src="https://mir-s3-cdn-cf.behance.net/user/276/df2bfd2271051.59b8e8f49b466.jpg" alt="" class="d-none">
                    </div>
                    <div v-on-clickaway="closeUpdate"
                         class="card-bd__title"
                         :class="{'card-bd__title--edit-mode': editMode}">
                        <div v-show="!editMode"
                             @click="switchToEditMode">
                            {{ cloud.name }}
                        </div>
                        <div class="card-bd__text-container" v-show="editMode">
                            <input ref="updateInput"
                                   type="text"
                                   v-model="newName"
                                   @keyup.enter="submitUpdate"
                                   :placeholder="cloud.name"/>
                        </div>
                    </div>
                    <div class="card-bd__infos-cloud" v-if="cloud.isAdmin">
                      <span class="card-bd__infos-cloud__projects">
                        <svgicon name="application" height="30" width="30"></svgicon>
                        +0
                      </span>
                      <span class="card-bd__infos-cloud__users">
                        +0
                        <svgicon name="account" height="30" width="30"></svgicon>
                      </span>
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
      newName: '',
      showRemoveActions: false
    }
  },
  components: {
    BaseButtonOption
  },
  mixins: [ clickaway ],
  props: {
    cloud: {
      type: Object,
      required: true
    }
  },
  methods: {
    accessCloud () {
      this.$store.commit('SET_CURRENT_CLOUD', this.cloud)
      this.$router.push({name: 'project-list'})
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
      if (this.newName === '' || this.newName === this.cloud.name) {
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
      let cloud = _.cloneDeep(this.cloud)
      cloud.name = name
      this.$store.dispatch('updateCloud', cloud).then(() => {
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
