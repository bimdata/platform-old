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
      long: '',
      lat: ''
    }
  },
  props: {
    panorama: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    BaseMap
  },
  watch: {
    panorama () {
      this.setMapElements()
    }
  },
  methods: {
    setMapElements () {
      let site = this.getIfcElements(this.panorama.id)
      let latitude = ''
      let longitude = ''

      if (site) {
        if (site.attributes) {
          // Fetch the DMS (Degrees, Minutes, Seconds) GPS coordinates from the IfcSite's  attributes
          latitude = site
            .attributes
            .properties
            .find(
              p => p.definition.name === 'RefLatitude')
            .value

          longitude = site
            .attributes
            .properties
            .find(
              p => p.definition.name === 'RefLongitude'
            )
            .value
        }
      }

      if (latitude && longitude) {
        // GPS coordinates converted to the decimal system used by OpenStreetMap
        this.lat = this.coordToDD(latitude)
        this.long = this.coordToDD(longitude)
        this.valid = true
      } else {
        this.valid = false
      }
    },
    DMStoDD (degrees, minutes, seconds) {
      var dd = degrees + minutes / 60 + seconds / (60 * 60)
      return dd
    },
    coordToDD (coord) {
      var e = coord.split(',')
      return this.DMStoDD(parseInt(e[0]), parseInt(e[1]), parseFloat(e[2] + '.' + e[3]))
    },
    submitAddress () {
      this.isSubmitting = true
      let urlAddress = this.ifcPostalAddress.replace(/ /g, '+')

      let self = this
      let xmlhttp = new XMLHttpRequest()
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
          if (xmlhttp.status === 200) {
            self.lat = JSON.parse(xmlhttp.response)[0].lat
            self.lon = JSON.parse(xmlhttp.response)[0].lon
          }
        }
      }

      xmlhttp.open('GET', 'https://nominatim.openstreetmap.org/search?q=' + urlAddress + '&format=json&polygon=1&addressdetails=1', true)
      xmlhttp.send()

      setTimeout(() => {
        this.valid = true
      }, 500)
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
    },
    latitude () {
      return parseInt(this.lat)
    },
    longitude () {
      return parseInt(this.lon)
    }
  }
}
</script>
