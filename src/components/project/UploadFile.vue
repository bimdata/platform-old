<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="text-center">
    <p class="mb-4" v-if="isUserRole">{{ $t('project.upload_text') }} <span>{{ text }}</span></p>
    <div v-if="isUserRole" class="upload-area upload-area-upload">
      <div iconName="newfile" class="base-button-empty__container uppy modalOpener">
        <div class="base-button-empty" v-on="listeners">
          <button class="btn btn-primary">{{ $t('project.upload') }} <span v-if="name === null">{{ text }}</span></button>
        </div>
        <slot></slot>
      </div>
      <div class="UploadContainer"></div>
      <button v-if="name === 'gedcard'" class="btn btn-primary" iconName="add-folder" @click.self="toggleAddFolderMenu">
        {{ $t('project.create_folder') }}
      </button>
      <div class="new_folder_box" v-show="addFolderMenu">
        <div class="new_folder_box__title">
          {{ $t('project.create_folder') }}
        </div>
        <div class="base-input-text-material">
          <input
            ref="createFolderInput"
            @keyup.enter="saveFolder"
            v-model="newFolderName"
            :placeholder="$t('project.folder_name')"
            type="text"
            required
          >
          <span class="highlight"></span>
          <span class="bar"></span>
        </div>
        <div class="new_folder_box__button-validation">
          <span @click="toggleAddFolderMenu">{{ $t('project.cancel') }}</span>
          <span @click="saveFolder">{{ $t('project.validate') }}</span>
        </div>
      </div>
      <div class="new_folder_box__overlay" v-show="addFolderMenu" @click="toggleAddFolderMenu"></div>
    </div>
  </div>
</template>

<script>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'
import { mapState } from 'vuex'
import { hasUserRole } from '@/utils/manageRights'
import BaseButtonTool from '@/components/base-components/BaseButtonTool'

export default {
  components: {
    BaseButtonTool
  },
  props: {
    target: {
      type: String,
      default: '.UploadContainer'
    },
    name: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    role: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      uppy: null,
      addFolderMenu: false,
      newFolderName: ''
    }
  },
  computed: {
    ...mapState('project', {
      project: 'selectedProject'
    }),
    projectId () {
      return this.project.id
    },
    cloudId () {
      return this.project.cloud.id
    },
    currentFolderId () {
      return this.$store.state.project.currentFolderId
    },
    isUserRole () {
      return this.hasUserRole(this.role)
    },
    listeners () {
      return {
        ...this.$listeners
      }
    }
  },
  methods: {
    hasUserRole,
    toggleAddFolderMenu (e) {
      this.addFolderMenu = !this.addFolderMenu
      if (this.addFolderMenu) {
        this.$nextTick(() => {
          this.$refs.createFolderInput.focus()
        })
      }
      this.newFolderName = ''
    },
    async saveFolder () {
      if (this.newFolderName !== '') {
        await this.$store.dispatch('project/createFolder', this.newFolderName)
        this.addFolderMenu = false
      }
    }
  },
  watch: {
    currentFolderId () {
      this.uppy.setMeta({
        parent_id: this.currentFolderId
      })
    }
  },
  mounted () {
    let baseApiUrl = process.env.BD_API_BASE_URL
    let endpointUpload = baseApiUrl + '/cloud/' + this.cloudId + '/project/' + this.projectId + '/document'
    let token = this.$store.state.oidc.access_token
    let target = this.target
    let options = {
      debug: false,
      autoProceed: false,
      restrictions: {
        // maxFileSize: 1000000000, // 1 Go
        maxNumberOfFiles: null,
        minNumberOfFiles: 1
      }
    }
    this.uppy = new Uppy(options)
      .use(Dashboard, {
        trigger: '.modalOpener',
        inline: false,
        target: target,
        replaceTargetContent: true,
        showProgressDetails: true,
        note: '',
        proudlyDisplayPoweredByUppy: false,
        height: 163,
        browserBackButtonClose: true
      })
      .use(XHRUpload, {
        endpoint: endpointUpload,
        fieldName: 'file',
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
    this.uppy.setMeta({
      parent_id: this.currentFolderId
    })
    this.uppy.on('complete', result => {
      this.$store.dispatch('project/getTree', this.$store.state.project.selectedProject)
      this.$store.dispatch('project/fetchProjectIfc', this.project)
      this.$emit('upload-complete', result)

      if (result.successful) {
        setTimeout(() => {
          this.uppy.getPlugin('Dashboard').closeModal()
        }, 2000)
      }
    })
  }
}
</script>
