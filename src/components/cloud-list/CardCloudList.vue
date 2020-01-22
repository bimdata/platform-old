<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="card-container">
    <div class="base-card card-item card-bd noselect">
      <div class="card-bd__bg" :style="{'background-color': bgColor}">
      </div>
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
          <li @click.stop.self="assignImage()">Upload image</li>
          </ul>
        </base-button-option>
      </div>
      <div class="card-bd__body" @click="accessCloud">
        <div class="card-bd__body__img">
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
          <div class="card-bd__picto-container">
            <Icon
              v-show="!cloud.image"
              class="icon-building"
              icon-name="icon-building"
              :style="{'--dark-color': svgColor.colorDark, '--color': svgColor.color, '--light-color': svgColor.colorLight}"
            >
              <component :is="image" />
            </Icon>
            <!-- <img v-show="!cloud.image" :src="url"> -->
          </div>
        </div>
        <div class="card-bd__body__title">
          <span
            v-if="cloud.name && cloud.name.length > 25"
            v-b-tooltip.hover
            :title="cloud.name"
          >{{ cloud.name | middle-truncate(25) }}</span>
          <span v-else>{{ cloud.name }}</span>
          <div class="card-bd__body__title-hr"></div>
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
import seedrandom from 'seedrandom'
import { mixin as clickaway } from 'vue-clickaway'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import { hasAdminRole } from '@/utils/manageRights'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import toArray from '@uppy/utils/lib/toArray'

import Icon from '../icons/icon.vue'
import IconBuilding from '../icons/icon-building.vue'
import IconBuilding02 from '../icons/icon-building_02.vue'
import IconBuilding03 from '../icons/icon-building_03.vue'
import IconBuilding04 from '../icons/icon-building_04.vue'
import IconBuilding05 from '../icons/icon-building_05.vue'

export default {
  components: {
    BaseButtonOption,
    BaseValidDelete,
    Icon,
    IconBuilding,
    IconBuilding02,
    IconBuilding03,
    IconBuilding04,
    IconBuilding05
  },
  data () {
    return {
      clicked: false,
      displayMenu: false,
      newName: '',
      showRemoveActions: false,
      displayRename: false,
      displayLoader: false,
      renameCloud: '',
      svgColor: null,
      bgColor: null,
      image: null,
      availableImagesComponent: [
        'IconBuilding',
        'IconBuilding02',
        'IconBuilding03',
        'IconBuilding04',
        'IconBuilding05'
      ],
      availableColors: [
        {
          colorDark: '#314E76',
          color: '#2EBBC5',
          colorLight: '#72EEF6'
        },
        {
          colorDark: '#CB1E22',
          color: '#FC590C',
          colorLight: '#F89E14'
        },
        {
          colorDark: '#185227',
          color: '#2F8340',
          colorLight: '#77BD85'
        },
        {
          colorDark: '#913731',
          color: '#D85C47',
          colorLight: '#E4937F'
        },
        {
          colorDark: '#5A9CC5',
          color: '#96C6E3',
          colorLight: '#CFE9F9'
        },
        {
          colorDark: '#845EC2',
          color: '#B39CD0',
          colorLight: '#E5E1EB'
        },
        {
          colorDark: '#2F374A',
          color: '#5E667B',
          colorLight: '#E3F0FF'
        },
        {
          colorDark: '#059E40',
          color: '#70B02B',
          colorLight: '#B5BE1D'
        },
        {
          colorDark: '#004A68',
          color: '#0075A5',
          colorLight: '#009DAD'
        },
        {
          colorDark: '#0F4C82',
          color: '#527CB7',
          colorLight: '#D4E1ED'
        },
        {
          colorDark: '#DDB539',
          color: '#F9C72C',
          colorLight: '#FFE48F'
        }
      ]
    }
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
        metaFields: ['size'],
        method: 'patch',
        endpoint: endpointUpload,
        fieldName: 'image',
        headers: {
          'authorization': `Bearer ${token}`
        }
      })

    this.uppy.on('file-added', (file) => {
      console.log(file.id)
      this.uppy.setFileMeta(file.id, {
        name: this.cloud.name
      })
    })

    this.uppy.on('upload-error', (file, error, response) => {
      this.$emit('on-upload-error', file.id)
    })

    this.uppy.on('complete', result => {
      this.$emit('on-upload-complete', result)
      if (result.successful) {
        this.cloud.image = result.successful[0].response.body.image
      }
    })
  },
  created () {
    const seededRng = seedrandom(this.cloud.id.toString())
    this.image = this.availableImagesComponent[Math.abs(seededRng.int32()) % this.availableImagesComponent.length]
    this.svgColor = this.availableColors[Math.abs(seededRng.int32()) % this.availableColors.length]
    const values = Object.values(this.svgColor)
    this.bgColor = values[Math.abs(seededRng.int32()) % values.length]
  }
}
</script>
