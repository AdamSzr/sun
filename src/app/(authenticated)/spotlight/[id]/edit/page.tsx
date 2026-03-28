import React from 'react'
import { notFound } from 'next/navigation'
import { spotlightManager } from '@fet/services/SpotlightManager'
import EditSpotlightForm from './EditSpotlightForm'

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function EditSpotlightPage({ params }: Props) {
    const { id } = await params

    // Fetch both spotlight and categories in parallel
    const [spotlight, categories] = await Promise.all([
        spotlightManager.getById(id),
        spotlightManager.getAllCategories()
    ])

    if (!spotlight) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <EditSpotlightForm spotlight={spotlight} categories={categories} />
        </div>
    )
}
