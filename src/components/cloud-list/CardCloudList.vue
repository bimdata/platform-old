<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="card-container">
    <div class="base-card card-item card-bd noselect">
      <div class="card-bd__header">
        <base-button-option ref="menu" @option-toggled="toggleMenu" v-if="hasAdminRole(cloud.role)">
          <ul>
            <li
              @click.stop.self="showRemoveActions = true"
              class="base-button-option__menu__remove"
            >
              {{ $t('project_list.remove') }}
              <transition name="slide-fade">
                <base-valid-delete
                  v-if="showRemoveActions"
                  @on-valid-action="remove"
                  @on-cancel-action="showRemoveActions = false"
                ></base-valid-delete>
              </transition>
            </li>
            <li @click.stop.self="toggleRename()" :class="{'actif': displayRename}">
              {{ $t('project.rename') }}
              <div class="new_folder_box rename" v-if="displayRename">
                <div class="new_folder_box__title">{{ $t('cloud_list.rename_cloud') }}</div>
                <div class="base-input-text-material">
                  <input
                    :ref="`rename-${cloud.id}`"
                    type="text"
                    :placeholder="cloud.name"
                    required
                    v-model="renameCloud"
                    @keyup.enter="saveRename"
                  />
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
      <div class="card-bd__body" @click="accessCloud">
        <div class="card-bd__body-container">
          <div class="card-bd__circle" @click.stop="assignImage()">
            <img v-show="cloud.image" :src="cloud.image">
            <div :id="`UppyForm-${$vnode.key}`">
              <input
                ref="input_file"
                v-show="false"
                type="file"
                name="files[]"
                @change="handleInputChange"
                multiple="true"
              >
            </div>
            <div class="card-bd__picto-container" >
              <svgicon v-show="!cloud.image" name="img-more" height="26" width="26"></svgicon>
            </div>
          </div>
          <div class="card-bd__title">
            <span
              v-if="cloud.name && cloud.name.length > 25"
              v-b-tooltip.hover
              :title="cloud.name"
            >{{ cloud.name | middle-truncate(25) }}</span>
            <span v-else>{{ cloud.name }}</span>
            </div>
          <div class="card-bd__infos-cloud">
            <span class="card-bd__infos-cloud__projects" v-if="hasAdminRole(cloud.role)">
              <svgicon name="application" height="30" width="30"></svgicon>
              +{{ cloud.projects.length }}
            </span>
            <span class="card-bd__infos-cloud__users" v-if="hasAdminRole(cloud.role)">
              +{{ cloud.users.length }}
              <svgicon name="account" height="30" width="30"></svgicon>
            </span>
          </div>
        </div>
      </div>
      <div class="loader-platform" v-show="displayLoader">
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
import { hasAdminRole } from '@/utils/manageRights'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import toArray from '@uppy/utils/lib/toArray'

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
  methods: {
    assignImage () {
      if (!this.cloud.image) {
        this.$refs.input_file.click()
      }
    },
    handleInputChange (event) {
      const files = toArray(event.target.files)

      files.forEach((file) => {
        try {
          this.uppy.addFile({
            source: this.id,
            name: file.name,
            type: file.type,
            data: file
          })
        } catch (err) {
          if (!err.isRestriction) {
            this.uppy.log(err)
          }
        }
      })
      event.target.value = null
    },
    hasAdminRole,
    toggleRename () {
      this.displayRename = !this.displayRename
      this.showRemoveActions = false
      this.renameCloud = this.cloud.name
      this.$nextTick(() => {
        this.$refs[`rename-${this.cloud.id}`].focus()
        this.$refs[`rename-${this.cloud.id}`].setSelectionRange(0, this.renameCloud.length)
      })
    },
    saveRename () {
      this.$store.dispatch('updateCloudName', {id: this.cloud.id, name: this.renameCloud})
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
    accessCloud (info) {
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
      this.clicked = true
      setTimeout(() => {
        this.clicked = false
      }, 500)
    }
  },
  mounted () {
    let baseApiUrl = process.env.BD_API_BASE_URL
    console.log(this.cloud)
    let endpointUpload = baseApiUrl + '/cloud/' + this.cloud.id
    let token = this.$store.state.oidc.access_token

    this.uppy = new Uppy({
      debug: true,
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000000000, // 1 Go
        maxNumberOfFiles: null,
        minNumberOfFiles: 1
      }
    })
      .use(XHRUpload, {
        method: 'patch',
        metaFields: ['size'],
        endpoint: endpointUpload,
        formData: true,
        fieldName: 'image',
        headers: {
          'authorization': `Bearer ${token}`
        }
      })

    this.uppy.on('upload-progress', (file, progress) => {
      const payload = {
        id: file.id,
        name: file.name,
        extension: file.extension,
        uploaded: progress.bytesUploaded,
        total: progress.bytesTotal
      }
      this.$emit('on-upload-progress', payload)
    })

    this.uppy.on('upload-error', (file, error, response) => {
      this.$emit('on-upload-error', file.id)
    })

    this.uppy.on('complete', result => {
      await this.update()
      this.$emit('on-upload-complete', result)

      if (result.successful) {
      }
    })
  }
}
</script>
