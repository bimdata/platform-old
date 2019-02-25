export class LeafletMap {
  constructor () {
    this.map = null
    this.points = []
  }

  load (element, lat, lng) {
    this.map = new window.OSMBuildings({
      container: element,
      position: { latitude: lat, longitude: lng },
      zoom: 16,
      minZoom: 10,
      maxZoom: 20,
      tilt: 45,
      rotation: -45,
      attribution: ' '
    })
    this.map.addMapTiles('https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png')
    this.map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json')
    this.map.addMarker(
      {latitude: lat, longitude: lng, altitude: 50},
      null,
      {color: '#2F374A'}
    )
  }
}
