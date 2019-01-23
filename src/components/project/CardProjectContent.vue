<template>
    <base-card :fullscreen-available="false">
        <template slot="header-title">
            {{ projectName }}
        </template>
        <template slot="content">
            <div class="main-ifc">
                <div class="shadowed-content main-ifc__map-info-content">
                    <div class="main-ifc__info-project">
                        <model-preview-slider
                          :panoramas="panoramas"
                          :show-viewer-button="true"
                        ></model-preview-slider>
                    </div>
                </div>
                <div class="main-ifc__map">
                    <map-project>
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

export default {
  components: {
    BaseCard,
    MapProject,
    ModelPreviewSlider
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
    }
  }
}
</script>
