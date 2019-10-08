<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="map-wrapper">
        <base-map :lat="latitude"
                  :lng="longitude"
                  v-if="valid"
                  :text="textProject">
        </base-map>
        <div class="h-100 w-100" v-else>
          <div class="map-wrapper__container" v-if="!secondStepActive">
            <div class="map-wrapper__container__step">
              <div class="map-wrapper__container__step--first">
                <svgicon name="map-marker" height="47" width="47"></svgicon>
                <p>IfcPostalAddress {{ $t('project.missing') }}</p>
                <button v-if="isAdminRole" class="btn btn-primary base-button-action" @click="secondStepActive = true">{{ $t('project.fill_in') }}</button>
              </div>
            </div>
          </div>
          <div class="map-wrapper__address-map" v-else>
            <base-map :lat="defLat"
              :lng="defLon"
              :text="textProject">
            </base-map>
            <div class="map-wrapper__address-map__input-container">
              <template v-if="!submitStep">
                <div class="base-input-text-material">
                  <input type="text" required="required" v-model="ifcPostalAddress" @keyup.enter="testAddress">
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>IfcPostalAddress</label>
                </div>
                <button class="btn btn-primary base-button-action" @click="testAddress">{{ $t('project.validate') }}</button>
              </template>
              <template v-else>
                <div class="base-input-text-material">
                  <input type="text" required="required" disabled v-model="ifcPostalAddress">
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>IfcPostalAddress</label>
                </div>
                <button class="btn btn-shadow" @click="retestAddress">{{ $t('project.cancel') }}</button>
                <button class="btn btn-primary base-button-action" @click="submitAddress">{{ $t('project.confirm') }}</button>
              </template>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import BaseMap from '@/components/base-components/BaseMap'
import { mapGetters } from 'vuex'
import { hasAdminRole } from '@/utils/manageRights'

export default {
  data () {
    return {
      valid: false,
      secondStepActive: false,
      submitStep: false,
      ifcPostalAddress: '',
      lon: '',
      lat: '',
      defLatitude: 0,
      defLongitude: 0
    }
  },
  props: {
    panorama: {
      type: Object,
      default: () => {}
    },
    role: {
      type: Number,
      default: null
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
    hasAdminRole,
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
    async testAddress () {
      const response = await this.getLatLongFromAddress()
      this.defLatitude = parseFloat(response.lat)
      this.defLongitude = parseFloat(response.lon)
      this.submitStep = true
    },
    retestAddress () {
      this.submitStep = false
    },
    async submitAddress () {
      await this.$store.dispatch('project/fetchElements')
      let site = this.getIfcSites(this.panorama.id)
      const data = {
        cloudPk: this.$store.state.currentCloud.id,
        projectPk: this.$route.params.projectId,
        ifcPk: this.panorama.id,
        lat: this.DDToDMS(this.defLat),
        long: this.DDToDMS(this.defLon),
        postalAddress: this.ifcPostalAddress,
        site: site
      }
      if (site && !site.id) {
        site = await this.$store.dispatch('project/createIfcSite', data)
      } else {
        await this.$store.dispatch('project/configureIfcSiteAddress', data)
      }
      await this.$store.dispatch('project/fetchElements')
      this.setMapElements()
      this.submitStep = false
      this.secondStepActive = false
      this.ifcPostalAddress = ''
      this.valid = true
    }
  },
  mounted () {
    this.$store.dispatch('project/fetchElements').then(() => {
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
    },
    defLat () {
      return this.defLatitude
    },
    defLon () {
      return this.defLongitude
    },
    isAdminRole () {
      return this.hasAdminRole(this.role)
    }
  }
}
</script>
