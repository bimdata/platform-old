<template>
    <div class="map-wrapper">
        <base-map :lat="lat"
                  :lng="long"
                  v-if="loaded"
                  :text="textProject">
        </base-map>
        <p v-else>loading map ...</p>
    </div>
</template>
<script>
import BaseMap from '@/components/base-components/BaseMap'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loaded: false,
      lat: '',
      long: ''
    }
  },
  components: {
    BaseMap
  },
  methods: {
    setMapElements () {
      const mainIfc = this.$store.getters['project/getMainIfc']
      let site = this.getIfcElements(mainIfc.id)
      // Fetch the DMS (Degrees, Minutes, Seconds) GPS coordinates from the IfcSite's  attributes
      let latitude = site
        .attributes
        .properties
        .find(
          p => p.definition.name === 'RefLatitude')
        .value

      let longitude = site
        .attributes
        .properties
        .find(
          p => p.definition.name === 'RefLongitude'
        )
        .value
      // GPS coordinates converted to the decimal system used by OpenStreetMap
      this.lat = this.coordToDD(latitude)
      this.long = this.coordToDD(longitude)
    },
    DMStoDD (degrees, minutes, seconds) {
      var dd = degrees + minutes / 60 + seconds / (60 * 60)
      return dd
    },
    coordToDD (coord) {
      var e = coord.split(',')
      return this.DMStoDD(parseInt(e[0]), parseInt(e[1]), parseFloat(e[2] + '.' + e[3]))
    }
  },
  created () {
    let osmbuildingsStyle = document.createElement('link')
    osmbuildingsStyle.setAttribute('href', 'https://cdn.osmbuildings.org/4.0.1/OSMBuildings.css')
    osmbuildingsStyle.setAttribute('rel', 'stylesheet')
    document.head.appendChild(osmbuildingsStyle)
    let osmbuildingsScript = document.createElement('script')
    osmbuildingsScript.setAttribute('src', 'https://cdn.osmbuildings.org/4.0.1/OSMBuildings.js')
    osmbuildingsScript.setAttribute('crossorigin', 'anonymous')
    document.body.appendChild(osmbuildingsScript)
  },
  mounted () {
    this.$store.dispatch('project/fetchElements').then(() => {
      this.loaded = true
      this.setMapElements()
    })
  },
  computed: {
    ...mapGetters('project', [
      'getIfcElements'
    ]),
    textProject () {
      return this.$store.state.project.selectedProject.name
    }
  }
}
</script>
