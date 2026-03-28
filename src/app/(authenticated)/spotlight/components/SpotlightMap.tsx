"use client"

import React from 'react'
import dynamic from 'next/dynamic'

// Disabling SSR for react-leaflet components since they reference `window`
const SpotlightMapContent = dynamic(() => import('./SpotlightMapContent'), { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 animate-pulse">
            <span className="text-gray-500 text-sm">Ładowanie mapy...</span>
        </div>
    )
})

type Props = {
    lat: number
    lng: number
    title?: string
}

export default function SpotlightMap({ lat, lng, title }: Props) {
    return (
        <div className="w-full h-[450px] relative z-0 mt-4 rounded-3xl overflow-hidden border border-white/10">
            <SpotlightMapContent lat={lat} lng={lng} title={title} />
        </div>
    )
}
