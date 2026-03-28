import React from 'react'
import Link from 'next/link'
import { Text, Flex } from '@fet/theme/ui'
import { spotlightManager } from '@fet/services/SpotlightManager'

export default async function SpotlightCategoriesPage() {
    const categories = await spotlightManager.getAllCategories()

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 max-w-7xl mx-auto">
            {/* Header */}
            <Flex className="justify-between items-end mb-12">
                <div>
                    <Text as="h1" className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
                        Odkrywaj przez Kategorie
                    </Text>
                    <Text className="text-gray-400 text-lg">
                        Wybierz interesujący Cię obszar i zanurz się w kolekcjach dodanych przez społeczność.
                    </Text>
                </div>
                
                <Link
                    href="/spotlight"
                    className="px-6 py-3 rounded-xl font-semibold bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all flex items-center gap-2"
                >
                    Wróć do wszystkich
                </Link>
            </Flex>

            {/* Siatka Kategorii */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                    <Link 
                        key={cat.id} 
                        href={`/spotlight?category=${cat.slug}`}
                        className="group relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/5 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)] hover:-translate-y-1 block h-64"
                    >
                        {/* Główna treść kafla */}
                        <div className="p-8 h-full flex flex-col items-start justify-between relative z-10">
                            <Flex className="items-center justify-between mb-4 w-full">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-colors shadow-inner">
                                    {cat.iconUrl || '📌'}
                                </div>
                                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-300 font-bold text-xl">
                                    →
                                </span>
                            </Flex>
                            
                            <div>
                                <Text as="h3" className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-1">
                                    {cat.name}
                                </Text>
                                <Text className="text-gray-400 leading-relaxed line-clamp-2">
                                    {cat.description || `Przeglądaj wszystkie dodane miejsca w kategorii ${cat.name}.`}
                                </Text>
                            </div>
                        </div>

                        {/* Tłumiony gradient ozdobny w tle */}
                        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-orange-500/20 blur-[60px] rounded-full group-hover:bg-orange-500/40 transition-colors duration-500 z-0 pointer-events-none" />
                    </Link>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="py-24 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                    <span className="text-5xl block mb-6">🏜️</span>
                    <Text className="text-gray-500 font-medium text-lg">
                        Brak dostępnych kategorii w systemie. Pora jakąś założyć!
                    </Text>
                </div>
            )}
        </div>
    )
}
