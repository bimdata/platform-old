<template>
  <div class="text-center">
    <svgicon :name="name"
              height="80"
              width="80"
              color="#EFF0F3 #fff #E6E7EA #DDDDDD #30374B #fff #fff"
              class="m-0">
    </svgicon>
    <p class="my-4" v-if="isUserRole">{{ $t('project.upload_text', {type: text}) }}</p>
    <div :id="`UppyForm-${$vnode.key}`">
      <form>
        <input type="file" name="files[]" multiple="">
      </form>
    </div>
  </div>
</template>

<script>
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import FileInput from '@uppy/file-input'
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
    const baseApiUrl = process.env.BD_API_BASE_URL
    const endpointUpload = baseApiUrl + '/cloud/' + this.cloudId + '/project/' + this.projectId + '/document'
    const token = this.$store.state.oidc.access_token
    const options = {
      debug: false,
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000000000, // 1 Go
        maxNumberOfFiles: null,
        minNumberOfFiles: 1
      }
    }
    this.uppy = new Uppy(options)
      .use(FileInput, {
        target: `#UppyForm-${this.$vnode.key}`,
        replaceTargetContent: true,
        pretty: true,
        inputNames: 'files[]',
        locale: {
          strings: {
            chooseFiles: this.$t('project.upload')
          }
        }
      })
      .use(XHRUpload, {
        endpoint: endpointUpload,
        formData: true,
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
      }
    })
  }
}
</script>
