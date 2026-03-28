import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { Text, Flex, Button } from '@fet/theme/ui'
import SpotlightGallery from '../components/SpotlightGallery'
import SpotlightRating from '../components/SpotlightRating'
import SpotlightComments from '../components/SpotlightComments'
import SpotlightMap from '../components/SpotlightMap'

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function SpotlightDetailPage({ params }: Props) {
    const { id } = await params
    const spotlight = await spotlightManager.getById(id)
    
    const { authUser } = await import('@fet/auth')
    const auth = await authUser()
    const currentUserId = auth ? String(auth.user.id) : undefined

    if (!spotlight) {
        notFound()
    }

    const { userManager } = await import('@/features/services/UserManager')
    const numId = parseInt(spotlight.userId, 10)
    let authorName = 'Użytkownik'
    if (!isNaN(numId)) {
        const author = await userManager.findById(numId).catch(() => null)
        if (author) authorName = author.name
    }

    const { media, categories } = spotlight

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <SpotlightGallery media={media} />

            <div className="absolute top-[35vh] md:top-[45vh] left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto pointer-events-none">
                <Flex className="items-center gap-3 mb-4 pointer-events-auto">
                    {categories.map(cat => (
                        <Link 
                            key={cat.id} 
                            href={`/spotlight?category=${cat.slug}`}
                            className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest bg-orange-500 hover:bg-orange-400 text-white transition-colors"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </Flex>
                <Text as="h1" className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter pointer-events-auto leading-tight">
                    {spotlight.title}
                </Text>
                <Flex className="items-center flex-wrap gap-4 md:gap-6 text-gray-400 pointer-events-auto">
                    <Flex className="items-center gap-2">
                        <span className="text-orange-500">📍</span>
                        <Text className="text-xs md:text-sm font-mono">{spotlight.lat}, {spotlight.lng}</Text>
                    </Flex>
                    <Flex className="items-center gap-2">
                        <span className="text-blue-500">👤</span>
                        <Text className="text-xs md:text-sm">
                            Dodane przez:{' '}
                            <Link href={`/spotlight/user/${spotlight.userId}`} className="text-blue-400 hover:text-white transition-colors hover:underline font-semibold">
                                {authorName}
                            </Link>
                        </Text>
                    </Flex>
                    {media.length > 0 && (
                        <Flex className="items-center gap-2">
                            <span className="text-purple-500">🖼</span>
                            <Text className="text-xs md:text-sm">{media.length} zdjęć</Text>
                        </Flex>
                    )}
                </Flex>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                <div className="lg:col-span-2 space-y-10 md:space-y-12">
                    <section className="space-y-4 md:space-y-6">
                        <Text as="h2" className="text-xl md:text-2xl font-bold border-l-4 border-orange-500 pl-4">
                            O tym miejscu
                        </Text>
                        <Text className="text-gray-300 leading-relaxed md:text-lg">
                            {spotlight.description}
                        </Text>
                    </section>

                    <section className="space-y-4 md:space-y-6">
                        <Text as="h2" className="text-xl md:text-2xl font-bold border-l-4 border-green-500 pl-4">
                            Lokalizacja
                        </Text>
                        <SpotlightMap lat={spotlight.lat} lng={spotlight.lng} title={spotlight.title} />
                    </section>

                    <section className="space-y-6 md:space-y-8">
                        <Text as="h2" className="text-xl md:text-2xl font-bold border-l-4 border-blue-500 pl-4">
                            Komentarze
                        </Text>
                        <SpotlightComments spotlightId={id} currentUserId={currentUserId} />
                    </section>
                </div>

                <aside className="space-y-6 md:space-y-8">
                    <SpotlightRating spotlightId={id} />

                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6">
                        <Link
                            href={`/spotlight/${id}/edit`}
                            className="flex items-center justify-center w-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors h-12 rounded-xl font-bold text-white text-sm md:text-base"
                        >
                            ✏️ Edytuj Spotlight
                        </Link>

                        <Link
                            href="/spotlight"
                            className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs md:text-sm"
                        >
                            ← Powrót do listy
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}
