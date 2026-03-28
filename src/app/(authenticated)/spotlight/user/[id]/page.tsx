import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { userManager } from '@/features/services/UserManager'
import { Text, Flex } from '@fet/theme/ui'
import SpotlightCard from '../../components/SpotlightCard'

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function UserSpotlightProfilePage({ params }: Props) {
    const { id } = await params
    
    const userIdNum = parseInt(id, 10)
    if (isNaN(userIdNum)) {
        notFound()
    }

    const user = await userManager.findById(userIdNum).catch(() => null)
    if (!user) {
        notFound() 
    }

    const [spotlights, comments] = await Promise.all([
        spotlightManager.getUserSpotlights(id),
        spotlightManager.getUserComments(id)
    ])

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 max-w-7xl mx-auto">
            {/* Header */}
            <Flex className="items-center gap-6 mb-16 border-b border-white/10 pb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <Text as="h1" className="text-4xl font-bold tracking-tight mb-2">
                        {user.name}
                    </Text>
                    <Text className="text-gray-400">
                        Profil twórcy Spotlight
                    </Text>
                </div>
            </Flex>

            <div className="space-y-16">
                {/* User Spotlights */}
                <section>
                    <Flex className="items-center justify-between mb-8">
                        <Text as="h2" className="text-2xl font-bold border-l-4 border-orange-500 pl-4">
                            Wpisy użytkownika ({spotlights.length})
                        </Text>
                    </Flex>
                    
                    {spotlights.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {spotlights.map(item => (
                                <SpotlightCard key={item.id} spotlight={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-12 text-center">
                            <Text className="text-gray-500 font-medium">Brak dodanych miejsc.</Text>
                        </div>
                    )}
                </section>

                {/* User Comments */}
                <section>
                    <Text as="h2" className="text-2xl font-bold border-l-4 border-blue-500 pl-4 mb-8">
                        Aktywność i komentarze ({comments.length})
                    </Text>

                    {comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map(c => (
                                <div key={c.id} className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05] transition-colors hover:bg-white/[0.05]">
                                    <Flex className="items-center justify-between mb-3">
                                        <Text className="text-xs text-gray-500">
                                            {new Date(c.createdAt).toLocaleDateString('pl-PL', { 
                                                day: 'numeric', month: 'long', year: 'numeric', 
                                                hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </Text>
                                        <Link 
                                            href={`/spotlight/${c.spotlightId}`}
                                            className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            Zobacz Spotlight <span>→</span>
                                        </Link>
                                    </Flex>
                                    
                                    <Text className="text-gray-300 whitespace-pre-wrap ml-4 pl-4 border-l-2 border-white/10 italic">
                                        "{c.content}"
                                    </Text>
                                    
                                    {/* @ts-ignore - Include relation typing */}
                                    {c.spotlight?.title && (
                                        <div className="mt-4 text-xs font-medium text-gray-500">
                                            Skomentowano wpis:{' '}
                                            {/* @ts-ignore */}
                                            <Link href={`/spotlight/${c.spotlightId}`} className="text-gray-300 hover:text-white transition-colors underline decoration-white/20 underline-offset-4">
                                                {/* @ts-ignore */}
                                                {c.spotlight.title}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-12 text-center">
                            <Text className="text-gray-500 font-medium">Brak dodanych komentarzy.</Text>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
