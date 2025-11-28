'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'

export default function GeoApp() {
  const [line,setLine] = useState()

  // useEffect(() =>{
  //   fetch('/api/geo-cords')
  //   .then(it => it.json())
  //   .then(it => it.item.geoCord ) //.map(v => ([v['lat'], v['long']]))
  //   .then( v => v.map(it => ([it['lat'], it['long']]) ))
  //   .then(setLine)
  // },[])



const routeCoordinates = [
  { lat: 53.5878, long: 17.8592 }, // Tuchola
  { lat: 53.6110, long: 18.0010 },
  { lat: 53.6820, long: 18.1085 },
  { lat: 53.7460, long: 18.2300 },
  { lat: 53.8415, long: 18.3415 },
  { lat: 53.9225, long: 18.4420 },
  { lat: 54.0070, long: 18.5355 },
  { lat: 54.1040, long: 18.6312 },
  { lat: 54.1610, long: 18.6785 },
  { lat: 54.2194, long: 18.7000 }, // Przedmieścia Gdańska
  { lat: 54.3520, long: 18.6466 }  // Gdańsk - centrum
];

// Zamiana `long` na `lng` (Leaflet wymaga `lat, lng`)
const polylineCoords = routeCoordinates.map(({ lat, long }) => [lat, long]);

  const Map = useMemo(() => dynamic(
    () => import('./Map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

console.log(line)

  return <div style={{ aspectRatio: `1 / 1` }}>
   {/* {polylineCoords && <Map line={polylineCoords} />} */}
  </div>
}
