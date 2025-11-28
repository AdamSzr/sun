"use client"

import { GeoCord, GeoPath } from '@prisma/client'
import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

type PathMap = {
  path:GeoPath,
  cords:GeoCord[]
}

const position: LatLngTuple = [52.2297, 21.0122]

// Ikona pinezki 20x30
const customIcon = L.icon({
  iconUrl: '/map/pin.png', // plik obrazu pinezki (np. w public/pin.png)
  iconSize: [20, 30],  // szerokość x wysokość
  iconAnchor: [10, 30], // punkt zakotwiczenia (środek dołu ikony)
  popupAnchor: [0, -30] // gdzie pojawia się popup względem ikony
})


export const tatraTrail = [
  { lat: 49.2196, lng: 20.0721 }, // Zakopane
  { lat: 49.2205, lng: 20.0800 },
  { lat: 49.2250, lng: 20.0900 },
  { lat: 49.2300, lng: 20.0950 },
  { lat: 49.2350, lng: 20.1000 }, // cel trasy
];

export default function Content({cords,path}:PathMap) {
  return (
    <div style={{width:500,height:500}}>
      <MapContainer style={{height:'inherit'}}center={[49.2250, 20.0900]}  zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Polyline positions={tatraTrail} color="red" />
      </MapContainer>
    </div>
  )
}
