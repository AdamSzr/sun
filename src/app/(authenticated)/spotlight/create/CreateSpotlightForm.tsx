"use client"

import React, { useActionState } from 'react'
import Link from 'next/link'
import { Text, Flex, Form, Input, Label, Button, Hint } from '@fet/theme/ui'
import { createSpotlight } from './actions'
import { SpotlightCategory } from '../types'

type Props = {
    categories: SpotlightCategory[]
}

export default function CreateSpotlightForm({ categories }: Props) {
    const [state, action, pending] = useActionState(createSpotlight, { success: null })

    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <div className="mb-10 space-y-2">
                <Link href="/spotlight" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
                    ← Powrót do listy
                </Link>
                <Text as="h1" className="text-4xl font-bold tracking-tight text-white">
                    Dodaj nowy Spotlight
                </Text>
                <Text className="text-gray-400">
                    Podziel się wyjątkowym miejscem ze społecznością Sun.
                </Text>
            </div>

            <Form
                action={action}
                variant="clean"
                className="
          bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] 
          rounded-3xl p-10 flex flex-col gap-8
        "
            >
                <div className="space-y-6">
                    <Flex className="flex-col gap-2">
                        <Label htmlFor="title" className="text-gray-300 ml-1">Tytuł miejsca</Label>
                        <Input
                            id="title"
                            name="title"
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-orange-500/50"
                            placeholder="np. Ukryty wodospad w lesie"
                            required
                        />
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="description" className="text-gray-300 ml-1">Opis</Label>
                        <textarea
                            id="description"
                            name="description"
                            className="
                bg-white/5 border border-white/10 text-white p-4 rounded-xl 
                min-h-[150px] focus:outline-none focus:border-orange-500/50 transition-colors
              "
                            placeholder="Opisz, co czyni to miejsce wyjątkowym..."
                            required
                        />
                    </Flex>

                    <div className="grid grid-cols-2 gap-6">
                        <Flex className="flex-col gap-2">
                            <Label htmlFor="lat" className="text-gray-300 ml-1">Szerokość (Lat)</Label>
                            <Input
                                id="lat"
                                name="lat"
                                type="number"
                                step="any"
                                className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                                placeholder="0.0000"
                                required
                            />
                        </Flex>
                        <Flex className="flex-col gap-2">
                            <Label htmlFor="lng" className="text-gray-300 ml-1">Długość (Lng)</Label>
                            <Input
                                id="lng"
                                name="lng"
                                type="number"
                                step="any"
                                className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                                placeholder="0.0000"
                                required
                            />
                        </Flex>
                    </div>

                    <Flex className="flex-col gap-2">
                        <Label className="text-gray-300 ml-1">Kategorie (wybierz co najmniej jedną)</Label>
                        <div className="flex flex-wrap gap-2 p-4 bg-white/5 border border-white/10 rounded-xl">
                            {categories.map(cat => (
                                <label key={cat.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent has-[:checked]:border-orange-500/30 has-[:checked]:bg-orange-500/10">
                                    <input type="checkbox" name="categoryIds" value={cat.id} className="accent-orange-500 h-4 w-4" />
                                    <span className="text-sm text-gray-300">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="visibility" className="text-gray-300 ml-1">Widoczność</Label>
                        <select
                            id="visibility"
                            name="visibility"
                            className="bg-white/5 border border-white/10 text-white h-12 px-4 rounded-xl focus:outline-none focus:border-orange-500/50"
                        >
                            <option value="PUBLIC">Publiczne</option>
                            <option value="FRIENDS">Dla znajomych</option>
                            <option value="PRIVATE">Prywatne</option>
                        </select>
                    </Flex>
                </div>

                <Button
                    type="submit"
                    disabled={pending}
                    className="
            h-14 font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-600 
            rounded-2xl shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)]
            hover:shadow-[0_15px_40px_-5px_rgba(234,88,12,0.5)]
            active:scale-[0.98] transition-all
          "
                >
                    {pending ? 'Publikowanie...' : 'Opublikuj Spotlight'}
                </Button>

                {state.success === false && (
                    <Hint variant="error" className="py-4 rounded-2xl bg-red-500/10 border-red-500/20 text-red-400">
                        {state.message || 'Wystąpił błąd podczas tworzenia.'}
                    </Hint>
                )}
            </Form>
        </div>
    )
}
