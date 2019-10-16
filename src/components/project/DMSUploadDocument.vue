<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="upload-area upload-area-dms">
        <base-button-tool iconName="newfile" class="uppy modalOpener" :label="$t('project.import_document')">
        </base-button-tool>
        <div class="DMSDashboardContainer"></div>
    </div>
</template>
<script>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'
import BaseButtonTool from '@/components/base-components/BaseButtonTool'
import { mapState } from 'vuex'

export default {
  props: {
    target: {
      type: String,
      default: '.DMSDashboardContainer'
    }
  },
  data () {
    return {
      uppy: null
    }
  },
  components: {
    BaseButtonTool
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

    this.uppy = new Uppy({
      debug: false,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000000000, // 1 Go
        maxNumberOfFiles: null,
        minNumberOfFiles: 1
      }
    })
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
