// src/components/Map.tsx
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap, useMapEvents } from 'react-leaflet/hooks';

export default function MyMap() {
  const [markers, setMarkers] = useState<[number,number][]>([]);

  console.log(markers.length);

  return <div style={{width:'600px',height:'600px'}}>
    <MapContainer center={[52,19]} zoom={8} style={{width:'600px',height:'600px'}}  >
      {/* <MyComponent onClick={(marker) => setMarkers(m => ([...m,marker]))} /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <Polyline positions={props.line} color="blue" weight={4} /> */}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker}>
          <Popup>Marker {index + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>; 
}

// function MyComponent({onClick}:{onClick}) {
//   const map = useMap()
//   map.on('click',({latlng})=> onClick([latlng.lat, latlng.lng]) )
//   return <></>
// }
