export class LeafletMap {
  constructor () {
    this.map = null
    this.points = []
    this.access_token = process.env.BD_MAPBOX_TOKEN ? process.env.BD_MAPBOX_TOKEN : 'pk.eyJ1IjoiYmltZGF0YSIsImEiOiJjanRpdTh0cDUybGttNDNwOHFlbG5xOHZzIn0.R4FXve5wv_znqkGK86G5BQ'
  }

  load (element, lat, lng) {
    window.mapboxgl.accessToken = this.access_token
    let latFloat = parseFloat(lat)
    let lngFloat = parseFloat(lng)
    this.map = new window.mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      container: element,
      center: [lngFloat, latFloat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      attributionControl: false
    })
    this.map.on('load', () => {
      var layers = this.map.getStyle().layers

      var labelLayerId
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id
          break
        }
      }

      this.map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      }, labelLayerId)
    })

    new window.mapboxgl.Marker({
      color: '#2f374a'
    })
      .setLngLat([lngFloat, latFloat])
      .addTo(this.map)
  }
}
