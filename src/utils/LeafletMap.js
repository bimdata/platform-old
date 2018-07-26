import L from 'leaflet'

export class LeafletMap {
  constructor () {
    this.map = null
    this.points = []
  }

  load (element) {
    this.map = L.map(element)
    new L.TileLayer('https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png', {
      attribution: '© Map <a href="https://mapbox.com">Mapbox</a>',
      maxZoom: 15,
      maxNativeZoom: 20
    }).addTo(this.map)
  }

  addMarker (lat, lng, text) {
    let point = [lat, lng]
    this.points.push(point)
    L.marker([lat, lng]).addTo(this.map)
      .bindPopup(`${text}`)
      .openPopup()
  }

  center () {
    this.map.fitBounds(this.points)
  }
}
