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
