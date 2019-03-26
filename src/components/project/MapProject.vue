<template>
    <div class="map-wrapper">
        <base-map :lat="latitude"
                  :lng="longitude"
                  v-if="loaded && valid"
                  :text="textProject">
        </base-map>
        <div class="map-wrapper__container" v-else>
          <div class="map-wrapper__container__step" v-if="!valid">
            <div class="map-wrapper__container__step--first" v-if="!secondStepActive">
              <svgicon name="map-marker" height="47" width="47"></svgicon>
              <p>IfcPostalAddress {{ $t('project.missing') }}</p>
              <button class="btn btn-primary base-button-action" @click="secondStepActive = true">{{ $t('project.advice') }}</button>
            </div>
            <div class="map-wrapper__container__step--second" v-else>
              <div v-if="!isSubmitting">
                <svgicon name="map-marker" height="47" width="47"></svgicon>
                <div class="base-input-text-material">
                  <input type="text" required="required" v-model="ifcPostalAddress" @keyup.enter="submitAddress">
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>IfcPostalAddress</label>
                </div>
                <button class="btn btn-primary base-button-action" @click="submitAddress">{{ $t('project.save') }}</button>
              </div>
              <div v-else>
                <svgicon name="map-marker" height="47" width="47"></svgicon>
                <div class="loader loader-layout">
                  <div class="lds-dual-ring"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="loader loader-layout" v-else>
            <p class="loader-layout__text">Loading</p>
            <div class="lds-dual-ring"></div>
          </div>
        </div>
    </div>
</template>
<script>
import BaseMap from '@/components/base-components/BaseMap'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loaded: false,
      valid: false,
      secondStepActive: false,
      isSubmitting: false,
      ifcPostalAddress: '',
      lon: '',
      lat: ''
    }
  },
  props: {
    panorama: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    panorama: {
      immediate: true,
      handler () {
        this.setMapElements()
      }
    }
  },
  components: {
    BaseMap
  },
  methods: {
    setMapElements () {
      let site = ''
      let latitude = ''
      let longitude = ''
      let address = ''

      if (this.panorama) {
        site = this.getIfcSites(this.panorama.id)
      }

      if (site) {
        if (site.attributes) {
          // Fetch the DMS (Degrees, Minutes, Seconds) GPS coordinates from the IfcSite's  attributes
          let refLatitude = site
            .attributes
            .properties
            .find(
              p => p.definition.name === 'RefLatitude')
          latitude = refLatitude && refLatitude.value

          let refLongitude = site
            .attributes
            .properties
            .find(
              p => p.definition.name === 'RefLongitude'
            )
          longitude = refLongitude && refLongitude.value

          let siteAddress = site
            .attributes
            .properties
            .find(
              p => p.definition.name === 'SiteAddress'
            )
          address = siteAddress && siteAddress.value
        }
      }

      if (latitude && longitude) {
        // GPS coordinates converted to the decimal system used by OpenStreetMap
        this.lat = this.coordToDD(latitude)
        this.lon = this.coordToDD(longitude)
        this.valid = true
      } else if (address) {
        this.getLatLongFromAddress()
          .then(response => {
            const data = {
              cloudPk: this.$store.state.currentCloud.id,
              projectPk: this.$route.params.projectId,
              ifcPk: this.panorama.id,
              lat: this.DDToDMS(this.lat),
              long: this.DDToDMS(this.lon),
              postalAddress: address,
              site: site
            }
            this.$store.dispatch('project/configureIfcSiteAdress', data)
          })
      } else {
        this.valid = false
        this.ifcPostalAddress = ''
        this.secondStepActive = false
      }
    },
    DMStoDD (degrees, minutes, seconds) {
      var dd = degrees + minutes / 60 + seconds / (60 * 60)
      return dd
    },
    DDToDMS (val) {
      val = Math.abs(val)
      const valDeg = Math.floor(val)
      const valMin = Math.floor((val - valDeg) * 60)
      const valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000
      console.log('DMS', [valDeg, valMin, ...valSec.toString().split('.')])
      return [valDeg, valMin, ...valSec.toString().split('.')]
    },
    coordToDD (coord) {
      var e = coord.split(',')
      return this.DMStoDD(parseInt(e[0]), parseInt(e[1]), parseFloat(e[2] + '.' + e[3]))
    },
    async getLatLongFromAddress () {
      const urlAddress = this.ifcPostalAddress.replace(/ /g, '+')
      const response = await fetch('https://nominatim.openstreetmap.org/search?q=' + urlAddress + '&format=json&polygon=1&addressdetails=1')
      const json = await response.json()
      return {
        lat: json[0].lat,
        lon: json[0].lon
      }
    },
    async submitAddress () {
      this.isSubmitting = true
      const response = await this.getLatLongFromAddress()
      this.lat = response.lat
      this.lon = response.lon

      let site = this.getIfcSites(this.panorama.id)
      const data = {
        cloudPk: this.$store.state.currentCloud.id,
        projectPk: this.$route.params.projectId,
        ifcPk: this.panorama.id,
        lat: this.DDToDMS(this.lat),
        long: this.DDToDMS(this.lon),
        postalAddress: this.ifcPostalAddress,
        site: site
      }

      if (!site.id) {
        site = await this.$store.dispatch('project/createIfcSite', data)
      } else {
        await this.$store.dispatch('project/configureIfcSiteAddress', data)
      }
      this.valid = true
      this.ifcPostalAddress = ''
    }
  },
  mounted () {
    this.$store.dispatch('project/fetchElements').then(() => {
      this.loaded = true
      this.setMapElements()
    })
  },
  computed: {
    ...mapGetters('project', [
      'getIfcSites'
    ]),
    textProject () {
      return this.$store.state.project.selectedProject.name
    },
    latitude () {
      return parseFloat(this.lat)
    },
    longitude () {
      return parseFloat(this.lon)
    }
  }
}
</script>
