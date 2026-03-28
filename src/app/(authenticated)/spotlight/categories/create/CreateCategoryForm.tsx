"use client"

import React, { useActionState } from 'react'
import Link from 'next/link'
import { Text, Flex, Form, Input, Label, Button, Hint } from '@fet/theme/ui'
import { createCategory } from './actions'

export default function CreateCategoryForm() {
    const [state, action, pending] = useActionState(createCategory, { success: undefined as any, message: '' })

    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <div className="mb-10 space-y-2">
                <Link href="/spotlight" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
                    ← Powrót do Spotlight
                </Link>
                <Text as="h1" className="text-4xl font-bold tracking-tight text-white">
                    Dodaj nową kategorię
                </Text>
                <Text className="text-gray-400">
                    Stwórz nową kategorię Spotlight, do której użytkownicy będą mogli przypisywać swoje miejsca.
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
                        <Label htmlFor="name" className="text-gray-300 ml-1">Nazwa kategorii</Label>
                        <Input
                            id="name"
                            name="name"
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-orange-500/50"
                            placeholder="np. Zabytki, Natura, Kawiarnie"
                            required
                        />
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="slug" className="text-gray-300 ml-1">Slug (unikalny identyfikator URL)</Label>
                        <Input
                            id="slug"
                            name="slug"
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-orange-500/50"
                            placeholder="np. zabytki, natura, kawiarnie"
                            required
                        />
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="description" className="text-gray-300 ml-1">Opis (opcjonalnie)</Label>
                        <textarea
                            id="description"
                            name="description"
                            className="
                bg-white/5 border border-white/10 text-white p-4 rounded-xl 
                min-h-[100px] focus:outline-none focus:border-orange-500/50 transition-colors
              "
                            placeholder="Zwięzły opis zawartości kategorii..."
                        />
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="iconUrl" className="text-gray-300 ml-1">URL Ikony (opcjonalnie)</Label>
                        <Input
                            id="iconUrl"
                            name="iconUrl"
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                            placeholder="https://..."
                        />
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="coverImage" className="text-gray-300 ml-1">Zdjęcie w tle (opcjonalnie)</Label>
                        <Input
                            id="coverImage"
                            name="coverImage"
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                            placeholder="https://..."
                        />
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="order" className="text-gray-300 ml-1">Wyśtwietlana kolejność (opcjonalnie)</Label>
                        <Input
                            id="order"
                            name="order"
                            type="number"
                            defaultValue={0}
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                        />
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
                    {pending ? 'Zapisywanie...' : 'Utwórz kategorię'}
                </Button>

                {state?.success === false && (
                    <Hint variant="error" className="py-4 rounded-2xl bg-red-500/10 border-red-500/20 text-red-400">
                        {state.message || 'Wystąpił błąd podczas tworzenia kategorii.'}
                    </Hint>
                )}
            </Form>
        </div>
    )
}
