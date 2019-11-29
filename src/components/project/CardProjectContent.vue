<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <base-card :fullscreen-available="false">
    <template slot="header-title">
      {{ projectName }}
    </template>
    <template v-if="panoramas.length === 0 && isUserRole" slot="content">
      <img src="../../../src/assets/images/illu-ifc.svg" >
      <upload-file text="IFC" :role="role"></upload-file>
    </template>
    <template slot="content" v-else-if="isLoading">
      <div class="loader-platform loader-layout">
        <div class="lds-dual-ring"></div>
      </div>
    </template>
    <template v-else slot="content">
      <div class="main-ifc">
        <div class="shadowed-content main-ifc__map-info-content">
          <div class="main-ifc__info-project">
            <model-preview-slider
              v-if="panoramas.length"
              :panoramas="panoramas"
              :show-viewer-button="true"
              @current-panorama="setCurrentPanorama"
            ></model-preview-slider>
          </div>
          <div class="main-ifc__navigation-project">
            <div class="main-ifc__navigation-project__title">
              <span v-if="currentNamePanorama && currentNamePanorama.length > 30" v-b-tooltip.hover :title="currentNamePanorama">{{ currentNamePanorama|middle-truncate(30) }}</span>
              <span v-else>{{ currentNamePanorama }}</span>
            </div>
          </div>
        </div>
        <div class="main-ifc__map">
          <map-project :panorama="currentPanorama" :role="role">
          </map-project>
        </div>
      </div>
    </template>
  </base-card>
</template>
<script>
import BaseCard from '@/components/base-components/BaseCard'
import MapProject from '@/components/project/MapProject'
import ModelPreviewSlider from '@/components/project/ModelPreviewSlider'
import UploadFile from '@/components/project/UploadFile'
import _ from 'lodash'
import { hasUserRole } from '@/utils/manageRights'

export default {
  components: {
    BaseCard,
    MapProject,
    ModelPreviewSlider,
    UploadFile
  },
  data () {
    return {
      currentNamePanorama: '',
      panorama: null
    }
  },
  props: {
    role: {
      type: Number,
      default: null
    }
  },
  watch: {
    panoramas (newVal, oldVal) {
      var vm = this
      newVal.forEach(function (panorama) {
        if (!panorama.viewer_360_file) {
          vm.getIfc(panorama.id)
        }
      })
    }
  },
  computed: {
    panoramas () {
      return this.$store.state.project.ifcs ? _.filter(_.sortBy(this.$store.state.project.ifcs, ['updated_at']), function (o) { return o.status !== 'E' }) : []
    },
    projectName () {
      return this.$store.state.project.selectedProject.name
    },
    currentPanorama () {
      return this.panorama
    },
    isLoading () {
      if (this.panoramas.length === 1 && this.panoramas[0].status === 'I') {
        return true
      }
      return false
    },
    isUserRole () {
      return this.hasUserRole(this.role)
    }
  },
  methods: {
    setCurrentPanorama (panorama) {
      this.currentNamePanorama = panorama.name
      this.panorama = panorama
    },
    hasUserRole,
    async getIfc (id) {
      const idInterval = setInterval(async () => {
        const ifcsPending = await this.$store.dispatch('getIfcViewerFile', {cloudPk: this.$store.state.project.selectedCloud.id, projectPk: this.$store.state.project.selectedProject.id, id: id})
        Promise.all([ ifcsPending ]).then(async ([resultPending]) => {
          if (ifcsPending) {
            window.clearInterval(idInterval)
          }
        })
      }, 2000)
    }
  }
}
</script>
