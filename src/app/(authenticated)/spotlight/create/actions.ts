"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { spotlightManager } from "@fet/services/SpotlightManager"

export async function createSpotlight(prevState: any, formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const lat = parseFloat(formData.get("lat") as string)
    const lng = parseFloat(formData.get("lng") as string)
    const visibility = formData.get("visibility") as any
    const categoryIds = formData.getAll("categoryIds") as string[]

    try {
        const spotlight = await spotlightManager.create({
            title,
            description,
            lat,
            lng,
            visibility,
            categoryIds,
            userId: "temp-user-id" // TODO: Get from session
        })

        revalidatePath("/spotlight")
    } catch (error) {
        console.error("Create spotlight error:", error)
        return { success: false, message: "Nie udało się utworzyć Spotlight." }
    }

    redirect("/spotlight")
}
