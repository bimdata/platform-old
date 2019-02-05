<template>
    <div id="base-map" :style="{ height: '100%' }">
    </div>
</template>
<script>
import { LeafletMap } from '@/utils/OSMBuildingsMap'

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
  mounted () {
    this.$nextTick(function () {
      let contextmap = new LeafletMap()
      contextmap.load('base-map', this.lat, this.lng)
    })
  }
}
</script>
