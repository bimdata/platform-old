<template>
    <base-card :fullscreen-available="false">
        <template slot="header-title">
            {{ projectName }}
        </template>
        <template slot="content">
            <div class="main-ifc">
                <div class="shadowed-content main-ifc__map-info-content">
                    <div class="main-ifc__info-project">
                        test
                    </div>
                    <div class="main-ifc__map">
                        <map-project>
                        </map-project>
                    </div>
                </div>
                <div class="main-ifc__detail-content">
                    Informations projet
                </div>
            </div>
        </template>
    </base-card>
</template>
<script>
import BaseCard from '@/components/base-components/BaseCard'
import MapProject from '@/components/project/MapProject'

export default {
  components: {
    BaseCard,
    MapProject
  },
  computed: {
    projectName () {
      return this.$store.state.project.selectedProject.name
    }
  },
  created () {
  }
}
</script>
