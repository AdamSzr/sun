"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Text } from '@fet/theme/ui'
import { SpotlightMedia } from '../types'

type Props = {
    media: SpotlightMedia[]
}

export default function SpotlightGallery({ media }: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const heroImage = media[0]
    const galleryImages = media.slice(1)

    const openLightbox = (index: number) => setSelectedIndex(index)
    const closeLightbox = () => setSelectedIndex(null)

    const nextImage = useCallback(() => {
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex + 1) % media.length)
    }, [selectedIndex, media.length])

    const prevImage = useCallback(() => {
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex - 1 + media.length) % media.length)
    }, [selectedIndex, media.length])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowRight') nextImage()
            if (e.key === 'ArrowLeft') prevImage()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedIndex, nextImage, prevImage])

    if (media.length === 0) {
        return (
            <div className="relative h-[60vh] w-full bg-gray-900 flex items-center justify-center">
                <div className="text-gray-800 text-4xl font-bold italic opacity-10 uppercase tracking-widest">
                    Brak zdjęć
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>
        )
    }

    return (
        <>
            {/* Hero Section */}
            <div 
                className="relative h-[65vh] w-full overflow-hidden cursor-zoom-in group"
                onClick={() => openLightbox(0)}
            >
                <div className="absolute inset-0 bg-gray-900">
                    <img
                        src={heroImage.src}
                        alt={heroImage.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
                
                {/* Hero Badge */}
                <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Flex className="items-center gap-2">
                        <span className="text-white text-sm font-medium">Zobacz galerię</span>
                        <span className="text-white/60 text-xs">({media.length})</span>
                    </Flex>
                </div>
            </div>

            {/* Gallery Grid Section (Inserted into the page content via the consumer) */}
            <div className="mt-12 space-y-6 max-w-7xl mx-auto px-12 w-full">
                <Text as="h2" className="text-2xl font-bold border-l-4 border-purple-500 pl-4">
                    Galeria
                </Text>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {media.map((m, i) => (
                        <div 
                            key={m.id} 
                            className="group relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08] hover:border-orange-500/50 transition-all duration-300 cursor-zoom-in shadow-lg hover:shadow-orange-500/10"
                            onClick={() => openLightbox(i)}
                        >
                            <img
                                src={m.src}
                                alt={m.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="text-xs font-medium text-white/90 truncate block">{m.title || `Zdjęcie ${i + 1}`}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Fullscreen Preview */}
            {selectedIndex !== null && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-300"
                    onClick={closeLightbox}
                >
                    {/* Header */}
                    <Flex className="absolute top-0 inset-x-0 p-6 justify-between items-center z-10" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <div className="text-white/70 text-sm font-medium">
                            {selectedIndex + 1} / {media.length} — {media[selectedIndex].title || 'Bez tytułu'}
                        </div>
                        <button 
                            onClick={closeLightbox}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </Flex>

                    {/* Main Content */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative">
                        {/* Navigation Arrows */}
                        <button 
                            onClick={(e: React.MouseEvent) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-6 md:left-12 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white transition-all hover:scale-110 z-10 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="max-w-[90vw] max-h-[80vh] relative group" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <img
                                src={media[selectedIndex].src}
                                alt={media[selectedIndex].title}
                                className="w-full h-full object-contain shadow-2xl rounded-sm"
                            />
                        </div>

                        <button 
                            onClick={(e: React.MouseEvent) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-6 md:right-12 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white transition-all hover:scale-110 z-10 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Thumbnails Row */}
                    <div className="h-24 bg-black/40 border-t border-white/5 p-4 flex justify-center gap-2 overflow-x-auto" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        {media.map((m, i) => (
                            <button
                                key={m.id}
                                onClick={() => setSelectedIndex(i)}
                                className={`
                                    relative h-full aspect-square rounded-md overflow-hidden border-2 transition-all 
                                    ${selectedIndex === i ? 'border-orange-500 scale-110 ring-4 ring-orange-500/20' : 'border-transparent opacity-50 hover:opacity-100'}
                                `}
                            >
                                <img src={m.src} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
