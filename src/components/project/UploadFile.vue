<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="text-center">
    <svgicon :name="name"
              height="80"
              width="80"
              color="#EFF0F3 #fff #E6E7EA #DDDDDD #30374B #fff #fff"
              class="m-0">
    </svgicon>
    <p class="my-4" v-if="isUserRole">{{ $t('project.upload_text') }} {{ text }}</p>
    <div v-if="isUserRole" class="upload-area upload-area-upload">
      <div iconName="newfile" class="base-button-empty__container uppy modalOpener">
        <div class="base-button-empty" v-on="listeners">
          <button class="btn btn-primary">{{ $t('project.upload') }} {{ btn }}</button>
        </div>
        <slot></slot>
      </div>
      <div class="UploadContainer"></div>
    </div>
  </div>
</template>

<script>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'
import { mapState } from 'vuex'
import { hasUserRole } from '@/utils/manageRights'

export default {
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
    btn: {
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
      uppy: null
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
    hasUserRole
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
        maxFileSize: 1000000000, // 1 Go
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
