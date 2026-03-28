"use client"

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

type Props = {
    lat: number
    lng: number
    title?: string
}

export default function SpotlightMapContent({ lat, lng, title }: Props) {
    return (
        <MapContainer 
            center={[lat, lng]} 
            zoom={16} 
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
                {title && (
                    <Popup>
                        <strong className="text-black">{title}</strong>
                    </Popup>
                )}
            </Marker>
        </MapContainer>
    )
}
