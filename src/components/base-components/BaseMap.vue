<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div id="base-map" :style="{ height: '100%' }">
    </div>
</template>
<script>
import { MapboxGL } from '@/utils/MapboxGL'

export default {
  props: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  watch: {
    lat () {
      this.reloadMap()
    },
    lng () {
      this.reloadMap()
    }
  },
  methods: {
    reloadMap () {
      let contextmap = new MapboxGL()
      contextmap.load('base-map', this.lat, this.lng)
    }
  },
  mounted () {
    this.$nextTick(function () {
      let contextmap = new MapboxGL()
      contextmap.load('base-map', this.lat, this.lng)
    })
  }
}
</script>
