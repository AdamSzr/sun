"use client"

import React, { useState } from 'react'
import { Text, Flex, Button } from '@fet/theme/ui'
import { SpotlightRateSdk } from '../sdk'

type Props = {
    spotlightId: string
}

export default function SpotlightRating({ spotlightId }: Props) {
    const [rating, setRating] = useState<number>(0)
    const [hoveredRating, setHoveredRating] = useState<number>(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleRate = async () => {
        if (rating === 0) return

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            await SpotlightRateSdk.create(spotlightId, { value: rating })
            setSubmitStatus('success')
            // Optionally, we could set rating to 0 or leave it to show what they rated
        } catch (error) {
            console.error('Failed to submit rating:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitStatus === 'success') {
        return (
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <Text as="h3" className="text-xl font-bold text-green-400">Dziękujemy za opinię!</Text>
                <Text className="text-gray-400 text-sm">Twoja opinia została pomyślnie dodana.</Text>
            </div>
        )
    }

    return (
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 space-y-6">
            <Text as="h3" className="text-xl font-bold">Twoja opinia</Text>
            <Flex className="gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                    <button 
                        key={star} 
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className={`
                            text-2xl transition-all cursor-pointer
                            ${(hoveredRating || rating) >= star ? 'scale-110 filter hover:scale-125' : 'grayscale opacity-50'}
                        `}
                    >
                        ⭐
                    </button>
                ))}
            </Flex>
            
            <Button 
                onClick={handleRate}
                disabled={rating === 0 || isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 border-none h-12 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Zapisywanie...' : 'Zostaw opinię'}
            </Button>

            {submitStatus === 'error' && (
                <Text className="text-red-400 text-sm text-center">Wystąpił błąd podczas dodawania opinii.</Text>
            )}
        </div>
    )
}
