<template>
    <div id="base-map" :style="{ height: '180px' }">
    </div>
</template>
<script>
import { LeafletMap } from '@/utils/LeafletMap'

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
      let map = new LeafletMap()
      map.load('base-map')
      map.addMarker(this.lat, this.lng, this.text)
      map.center()
    })
  }
}
</script>
