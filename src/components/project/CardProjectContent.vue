<template>
    <base-card :fullscreen-available="false">
        <template slot="header-title">
            {{ projectName }}
        </template>
        <template v-if="ifcs.length === 0" slot="content">
          <upload-file name="upload-ifc" text="IFC"></upload-file>
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
              <map-project :panorama="currentPanorama">
              </map-project>
            </div>
          </div>
        </template>
    </base-card>
</template>
<script>
import { mapGetters } from 'vuex'
import BaseCard from '@/components/base-components/BaseCard'
import MapProject from '@/components/project/MapProject'
import ModelPreviewSlider from '@/components/project/ModelPreviewSlider'
import UploadFile from '@/components/project/UploadFile'

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
  computed: {
    ...mapGetters({
      ifcs: 'project/getSortedIfc'
    }),
    panoramas () {
      return this.ifcs
        .filter(item => item.viewer_360_file)
    },
    projectName () {
      return this.$store.state.project.selectedProject.name
    },
    currentPanorama () {
      return this.panorama
    }
  },
  methods: {
    setCurrentPanorama (panorama) {
      this.currentNamePanorama = panorama.name
      this.panorama = panorama
    }
  }
}
</script>
