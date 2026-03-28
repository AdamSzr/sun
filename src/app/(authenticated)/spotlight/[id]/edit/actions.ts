"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { spotlightManager } from "@fet/services/SpotlightManager"

export async function updateSpotlight(id: string, prevState: any, formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const lat = parseFloat(formData.get("lat") as string)
    const lng = parseFloat(formData.get("lng") as string)
    const visibility = formData.get("visibility") as any
    const categoryIds = formData.getAll("categoryIds") as string[]

    try {
        await spotlightManager.update(id, {
            title,
            description,
            lat,
            lng,
            visibility,
            categoryIds,
        })

        revalidatePath(`/spotlight/${id}`)
        revalidatePath("/spotlight")
    } catch (error) {
        console.error("Update spotlight error:", error)
        return { success: false, message: "Nie udało się zaktualizować Spotlight." }
    }

    redirect(`/spotlight/${id}`)
}
