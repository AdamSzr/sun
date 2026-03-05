import React from 'react'
import { spotlightManager } from '@fet/services/SpotlightManager'
import CreateSpotlightForm from './CreateSpotlightForm'

export default async function CreateSpotlightPage() {
    const categories = await spotlightManager.getAllCategories()

    return (
        <div className="min-h-screen bg-[#050505]">
            <CreateSpotlightForm categories={categories} />
        </div>
    )
}
