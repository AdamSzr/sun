"use client"

import React, { useActionState, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Text, Flex, Form, Input, Label, Button, Hint } from '@fet/theme/ui'
import { updateSpotlight } from './actions'
import { SpotlightMediaSdk } from '../../sdk'
import { SpotlightCategory, SpotlightMedia } from '../../types'

type Props = {
    spotlight: {
        id: string;
        title: string;
        description: string;
        lat: number;
        lng: number;
        visibility: "PUBLIC" | "FRIENDS" | "PRIVATE";
        categories: SpotlightCategory[];
        media: SpotlightMedia[];
    }
    categories: SpotlightCategory[]
}

export default function EditSpotlightForm({ spotlight, categories }: Props) {
    const router = useRouter()
    const updateAction = updateSpotlight.bind(null, spotlight.id)
    const [state, action, pending] = useActionState(updateAction, { success: undefined as any, message: '' })

    const [existingMedia, setExistingMedia] = useState<SpotlightMedia[]>(spotlight.media)
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Geolocation States
    const [lat, setLat] = useState<string>(spotlight.lat.toString())
    const [lng, setLng] = useState<string>(spotlight.lng.toString())
    const [isFetchingLocation, setIsFetchingLocation] = useState(false)

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Twoja przeglądarka nie wspiera geolokalizacji.')
            return
        }

        setIsFetchingLocation(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude.toFixed(6))
                setLng(position.coords.longitude.toFixed(6))
                setIsFetchingLocation(false)
            },
            (error) => {
                console.error('Błąd geolokalizacji:', error)
                alert('Nie udało się pobrać lokalizacji. Sprawdź ustawienia uprawnień przeglądarki/urządzenia.')
                setIsFetchingLocation(false)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        )
    }

    // Generate previews when files change
    useEffect(() => {
        const urls = files.map(f => URL.createObjectURL(f))
        setPreviews(urls)
        return () => urls.forEach(u => URL.revokeObjectURL(u))
    }, [files])

    // After spotlight is updated, upload new images and redirect
    useEffect(() => {
        if (state?.success) {
            if (files.length === 0) {
                router.push(`/spotlight/${spotlight.id}`)
                return
            }

            setUploading(true)

            const uploadAll = async () => {
                for (let i = 0; i < files.length; i++) {
                    setUploadProgress(`Przesyłanie ${i + 1}/${files.length}...`)
                    try {
                        await SpotlightMediaSdk.upload(spotlight.id, files[i])
                    } catch (err) {
                        console.error(`Failed to upload file ${files[i].name}:`, err)
                    }
                }
                setUploading(false)
                router.push(`/spotlight/${spotlight.id}`)
            }

            uploadAll()
        }
    }, [state])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files
        if (!selected) return
        const newFiles = Array.from(selected)
        setFiles(prev => [...prev, ...newFiles])
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const removeNewFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const deleteExistingMedia = async (mediaId: string) => {
        if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) return

        try {
            await SpotlightMediaSdk.delete(spotlight.id, mediaId)
            setExistingMedia(prev => prev.filter(m => m.id !== mediaId))
        } catch (err) {
            console.error('Failed to delete media:', err)
            alert('Nie udało się usunąć zdjęcia.')
        }
    }

    const selectedCategoryIds = spotlight.categories.map(c => c.id)

    const isDisabled = pending || uploading

    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <div className="mb-10 space-y-2">
                <Link href={`/spotlight/${spotlight.id}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
                    ← Powrót do Spotlight
                </Link>
                <Text as="h1" className="text-4xl font-bold tracking-tight text-white">
                    Edytuj Spotlight
                </Text>
                <Text className="text-gray-400">
                    Wprowadź poprawki do tego miejsca.
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
                            defaultValue={spotlight.title}
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
                            defaultValue={spotlight.description}
                            className="
                bg-white/5 border border-white/10 text-white p-4 rounded-xl 
                min-h-[150px] focus:outline-none focus:border-orange-500/50 transition-colors
              "
                            placeholder="Opisz, co czyni to miejsce wyjątkowym..."
                            required
                        />
                    </Flex>

                    <div className="space-y-4">
                        <Flex className="items-center justify-between">
                            <Label className="text-gray-300 font-semibold text-lg ml-1">Współrzędne geograficzne</Label>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={isFetchingLocation || isDisabled}
                                className="text-sm font-medium flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl transition-colors border border-blue-500/20 disabled:opacity-50 cursor-pointer active:scale-95"
                            >
                                {isFetchingLocation ? '⏳ Trwa namierzanie...' : '📍 Użyj mojej lokalizacji'}
                            </button>
                        </Flex>

                        <div className="grid grid-cols-2 gap-6">
                            <Flex className="flex-col gap-2">
                                <Label htmlFor="lat" className="text-gray-400 text-sm ml-1">Szerokość (Lat)</Label>
                                <Input
                                    id="lat"
                                    name="lat"
                                    type="number"
                                    step="any"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="0.0000"
                                    required
                                />
                            </Flex>
                            <Flex className="flex-col gap-2">
                                <Label htmlFor="lng" className="text-gray-400 text-sm ml-1">Długość (Lng)</Label>
                                <Input
                                    id="lng"
                                    name="lng"
                                    type="number"
                                    step="any"
                                    value={lng}
                                    onChange={(e) => setLng(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="0.0000"
                                    required
                                />
                            </Flex>
                        </div>
                    </div>

                    <Flex className="flex-col gap-2">
                        <Label className="text-gray-300 ml-1">Kategorie (wybierz co najmniej jedną)</Label>
                        <div className="flex flex-wrap gap-2 p-4 bg-white/5 border border-white/10 rounded-xl">
                            {categories.map(cat => {
                                const isSelected = selectedCategoryIds.includes(cat.id);
                                return (
                                    <label key={cat.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent has-[:checked]:border-orange-500/30 has-[:checked]:bg-orange-500/10">
                                        <input type="checkbox" name="categoryIds" value={cat.id} defaultChecked={isSelected} className="accent-orange-500 h-4 w-4" />
                                        <span className="text-sm text-gray-300">{cat.name}</span>
                                    </label>
                                )
                            })}
                        </div>
                    </Flex>

                    <Flex className="flex-col gap-2">
                        <Label htmlFor="visibility" className="text-gray-300 ml-1">Widoczność</Label>
                        <select
                            id="visibility"
                            name="visibility"
                            defaultValue={spotlight.visibility}
                            className="bg-white/5 border border-white/10 text-white h-12 px-4 rounded-xl focus:outline-none focus:border-orange-500/50"
                        >
                            <option value="PUBLIC">Publiczne</option>
                            <option value="FRIENDS">Dla znajomych</option>
                            <option value="PRIVATE">Prywatne</option>
                        </select>
                    </Flex>

                    {/* Image Management Section */}
                    <Flex className="flex-col gap-2">
                        <Label className="text-gray-300 ml-1">Zdjęcia</Label>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                            {/* Existing Media Grid */}
                            {existingMedia.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Istniejące zdjęcia</span>
                                    <div className="grid grid-cols-3 gap-3">
                                        {existingMedia.map((m) => (
                                            <div key={m.id} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={m.src}
                                                    alt={m.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => deleteExistingMedia(m.id)}
                                                    className="
                                                        absolute top-2 right-2 w-7 h-7 rounded-full
                                                        bg-black/60 backdrop-blur text-white text-sm
                                                        flex items-center justify-center
                                                        opacity-0 group-hover:opacity-100 transition-opacity
                                                        hover:bg-red-500/80 cursor-pointer
                                                    "
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* New Previews Grid */}
                            {previews.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-orange-500/70 uppercase tracking-wider ml-1">Nowe zdjęcia do dodania</span>
                                    <div className="grid grid-cols-3 gap-3">
                                        {previews.map((src, i) => (
                                            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-orange-500/20 bg-orange-500/5">
                                                <img
                                                    src={src}
                                                    alt={files[i]?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewFile(i)}
                                                    className="
                                                        absolute top-2 right-2 w-7 h-7 rounded-full
                                                        bg-black/60 backdrop-blur text-white text-sm
                                                        flex items-center justify-center
                                                        opacity-0 group-hover:opacity-100 transition-opacity
                                                        hover:bg-red-500/80 cursor-pointer
                                                    "
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add button */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="
                                    w-full py-6 rounded-xl border-2 border-dashed border-white/10
                                    hover:border-orange-500/40 hover:bg-orange-500/5
                                    transition-all duration-200 cursor-pointer
                                    flex flex-col items-center gap-2
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span className="text-sm text-gray-400">Dodaj zdjęcia</span>
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    </Flex>
                </div>

                <Button
                    type="submit"
                    disabled={isDisabled}
                    className="
            h-14 font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-600 
            rounded-2xl shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)]
            hover:shadow-[0_15px_40px_-5px_rgba(234,88,12,0.5)]
            active:scale-[0.98] transition-all
          "
                >
                    {uploading
                        ? uploadProgress
                        : pending
                            ? 'Zapisywanie...'
                            : `Zapisz zmiany${files.length > 0 ? ` (+ ${files.length} zdjęć)` : ''}`
                    }
                </Button>

                {state.success === false && (
                    <Hint variant="error" className="py-4 rounded-2xl bg-red-500/10 border-red-500/20 text-red-400">
                        {state.message || 'Wystąpił błąd podczas aktualizacji.'}
                    </Hint>
                )}
            </Form>
        </div>
    )
}
