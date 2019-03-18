<template>
  <div class="card-container">
    <div class="base-card card-item card-bd noselect">
      <div class="card-bd__header">
        <base-button-option @option-toggled="toggleMenu" v-if="isAdmin">
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
                  {{ $t('cloud_list.rename_cloud') }}
                </div>
                <div class="base-input-text-material">
                  <input
                    type="text"
                    autofocus
                    :placeholder="cloud.name"
                    required
                    v-model="renameCloud"
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
      <div class="card-bd__body">
        <div class="card-bd__body-container">
          <div class="card-bd__circle" @click.prevent="accessCloud">
            <div class="card-bd__picto-container">
              <svgicon name="img-more" height="26" width="26"></svgicon>
            </div>
            <img src="https://mir-s3-cdn-cf.behance.net/user/276/df2bfd2271051.59b8e8f49b466.jpg" alt="" class="d-none">
          </div>
          <div class="card-bd__title">
            <span v-if="cloud.name && cloud.name.length > 25" v-b-tooltip.hover :title="cloud.name">{{ cloud.name | middle-truncate(25) }}</span>
            <span v-else>{{ cloud.name }}</span>
            </div>
          <div class="card-bd__infos-cloud">
            <span class="card-bd__infos-cloud__projects" v-if="isAdmin">
              <svgicon name="application" height="30" width="30"></svgicon>
              +{{ cloud.projects.length }}
            </span>
            <span class="card-bd__infos-cloud__users" v-if="isAdmin">
              +{{ cloud.users.length }}
              <svgicon name="account" height="30" width="30"></svgicon>
            </span>
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
import BaseValidDelete from '@/components/base-components/BaseValidDelete'

export default {
  data () {
    return {
      clicked: false,
      displayMenu: false,
      newName: '',
      showRemoveActions: false,
      displayRename: false,
      displayLoader: false,
      renameCloud: ''
    }
  },
  components: {
    BaseButtonOption,
    BaseValidDelete
  },
  mixins: [ clickaway ],
  props: {
    cloud: {
      type: Object,
      required: true
    }
  },
  computed: {
    isAdmin () {
      return this.cloud.role === 100
    }
  },
  methods: {
    toggleRename () {
      this.displayRename = !this.displayRename
      this.showRemoveActions = false
      this.renameCloud = this.cloud.name
    },
    saveRename () {
      this.$store.dispatch('updateCloudName', {id: this.cloud.id, name: this.renameCloud})
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
    accessCloud () {
      this.$store.commit('SET_CURRENT_CLOUD', this.cloud)
      this.$router.push({name: 'project-list', params: {cloudId: this.cloud.id}})
    },
    remove () {
      this.displayLoader = true
      this.$store.dispatch('removeCloud', this.cloud.id).then(() => {
        this.displayLoader = false
      })
    },
    toggleMenu (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = false
        this.displayRename = false
      }
    },
    closeTool () {
      this.displayMenu = false
    },
    submitUpdate () {
      if (this.newName === '' || this.newName === this.cloud.name) {
        this.newName = ''
      } else {
        this.update(this.newName).then(() => {
          this.newName = ''
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
