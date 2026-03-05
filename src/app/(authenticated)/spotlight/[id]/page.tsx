import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { Text, Flex, Button } from '@fet/theme/ui'

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function SpotlightDetailPage({ params }: Props) {
    const { id } = await params
    const spotlight = await spotlightManager.getById(id)

    if (!spotlight) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-800 text-4xl font-bold italic opacity-10">
                        MEDIA GALLERY / HERO IMAGE
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-12 max-w-7xl mx-auto">
                    <Flex className="items-center gap-3 mb-4">
                        {spotlight.categories.map(cat => (
                            <span key={cat.id} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-orange-500 text-white">
                                {cat.name}
                            </span>
                        ))}
                    </Flex>
                    <Text as="h1" className="text-6xl font-bold mb-4 tracking-tighter">
                        {spotlight.title}
                    </Text>
                    <Flex className="items-center gap-6 text-gray-400">
                        <Flex className="items-center gap-2">
                            <span className="text-orange-500">📍</span>
                            <Text className="text-sm font-mono">{spotlight.lat}, {spotlight.lng}</Text>
                        </Flex>
                        <Flex className="items-center gap-2">
                            <span className="text-blue-500">👤</span>
                            <Text className="text-sm">Dodane przez użytkownika</Text>
                        </Flex>
                    </Flex>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-12 py-16 grid grid-cols-3 gap-16">
                <div className="col-span-2 space-y-12">
                    <section className="space-y-6">
                        <Text as="h2" className="text-2xl font-bold border-l-4 border-orange-500 pl-4">
                            O tym miejscu
                        </Text>
                        <Text className="text-gray-300 leading-relaxed text-lg">
                            {spotlight.description}
                        </Text>
                    </section>

                    <section className="space-y-8">
                        <Text as="h2" className="text-2xl font-bold border-l-4 border-blue-500 pl-4">
                            Komentarze
                        </Text>
                        <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/[0.08] text-center">
                            <Text className="text-gray-500">Sekcja komentarzy wkrótce...</Text>
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 space-y-6">
                        <Text as="h3" className="text-xl font-bold">Twoja opinia</Text>
                        <Flex className="gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} className="text-2xl hover:scale-110 transition-transform filter grayscale hover:grayscale-0">
                                    ⭐
                                </button>
                            ))}
                        </Flex>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 border-none h-12 rounded-xl font-bold">
                            Zostaw opinię
                        </Button>
                    </div>

                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8">
                        <Link
                            href="/spotlight"
                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                            ← Powrót do listy
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}
