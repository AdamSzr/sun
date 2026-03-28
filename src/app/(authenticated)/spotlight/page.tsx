import React from 'react'
import Link from 'next/link'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { Text, Flex } from '@fet/theme/ui'
import SpotlightCard from './components/SpotlightCard'

type Props = {
  searchParams: Promise<{
    category?: string
    visibility?: string
  }>
}

export default async function SpotlightPage({ searchParams }: Props) {
  const { category, visibility } = await searchParams

  const [spotlights, categories] = await Promise.all([
    spotlightManager.getAll({
      categorySlug: category,
      visibility
    }),
    spotlightManager.getAllCategories()
  ])

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      {/* Header Section */}
      <Flex className="flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-2">
          <Text as="h1" className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Odkrywaj Spotlight
          </Text>
          <Text className="text-gray-400">
            Znajdź najciekawsze miejsca i wydarzenia w Twojej okolicy.
          </Text>
        </div>

        <Link
          href="/spotlight/create"
          className="
            px-6 py-3 rounded-xl font-semibold w-full md:w-auto text-center
            bg-orange-600 hover:bg-orange-700
            shadow-[0_10px_20px_-5px_rgba(234,88,12,0.4)]
            transition-all active:scale-95
          "
        >
          + Dodaj Spotlight
        </Link>
      </Flex>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div className="space-y-4">
            <Flex className="justify-between items-center">
              <Text as="h3" className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Kategorie
              </Text>
              <Link href="/spotlight/categories/create" className="text-xs text-orange-500 hover:text-orange-400 font-semibold transition-colors">
                + Dodaj
              </Link>
            </Flex>
            <div className="flex flex-col gap-1">
              <Link
                href="/spotlight"
                className={`
                  px-3 py-2 rounded-lg text-sm transition-all
                  ${!category ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                Wszystkie
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/spotlight?category=${cat.slug}`}
                  className={`
                    px-3 py-2 rounded-lg text-sm transition-all
                    ${category === cat.slug ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/5">
            <Text as="h3" className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Widoczność
            </Text>
            <div className="flex flex-col gap-1">
              {['PUBLIC', 'FRIENDS', 'PRIVATE'].map(v => (
                <Link
                  key={v}
                  href={`/spotlight?visibility=${v}${category ? `&category=${category}` : ''}`}
                  className={`
                    px-3 py-2 rounded-lg text-sm capitalize transition-all
                    ${visibility === v ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {v === 'PUBLIC' ? 'Publiczne' : v === 'FRIENDS' ? 'Dla znajomych' : 'Prywatne'}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid Results */}
        <main className="flex-1">
          {spotlights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spotlights.map(item => (
                <SpotlightCard key={item.id} spotlight={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
              <span className="text-4xl mb-4">🔍</span>
              <Text className="text-gray-400 font-medium">Brak wyników w tej kategorii.</Text>
              <Link href="/spotlight" className="text-orange-500 text-sm mt-2 hover:underline">
                Wyczyść filtry
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
