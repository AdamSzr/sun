"use client"

import React from 'react'
import Link from 'next/link'
import { Spotlight } from '../types'
import { Text, Flex } from '@fet/theme/ui'

type SpotlightCardProps = {
    spotlight: Spotlight
}

export default function SpotlightCard({ spotlight }: SpotlightCardProps) {
    return (
        <Link
            href={`/spotlight/${spotlight.id}`}
            className="
        group relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-md
        border border-white/[0.08]
        hover:border-orange-500/30 transition-all duration-300
        hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)]
      "
        >
            {/* Media Preview (Placeholder for now) */}
            <div className="aspect-video w-full bg-gray-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold italic opacity-20">
                    SPOTLIGHT PREVIEW
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="
            px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
            bg-orange-500/20 text-orange-400 border border-orange-500/30
          ">
                        {spotlight.categories?.[0]?.name || 'Spotlight'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="space-y-1">
                    <Text as="h3" className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors truncate">
                        {spotlight.title}
                    </Text>
                    <Text as="p" className="text-sm text-gray-400 line-clamp-2 min-h-[40px]">
                        {spotlight.description}
                    </Text>
                </div>

                <Flex className="items-center justify-between mt-4">
                    <Flex className="items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-[10px] text-gray-300">📍</span>
                        </div>
                        <Text className="text-[10px] text-gray-500 font-mono">
                            {spotlight.lat.toFixed(4)}, {spotlight.lng.toFixed(4)}
                        </Text>
                    </Flex>

                    <div className="text-xs text-orange-500/60 font-medium group-hover:text-orange-500 transition-colors">
                        View Details →
                    </div>
                </Flex>
            </div>
        </Link>
    )
}
