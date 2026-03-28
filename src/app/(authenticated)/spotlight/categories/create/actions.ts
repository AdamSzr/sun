"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { spotlightManager } from "@fet/services/SpotlightManager"

export async function createCategory(prevState: any, formData: FormData) {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string | undefined
    const iconUrl = formData.get("iconUrl") as string | undefined
    const coverImage = formData.get("coverImage") as string | undefined
    const rawOrder = formData.get("order")
    const order = rawOrder ? parseInt(rawOrder as string, 10) : 0

    try {
        await spotlightManager.createCategory({
            name,
            slug,
            description: description || undefined,
            iconUrl: iconUrl || undefined,
            coverImage: coverImage || undefined,
            order
        })

        revalidatePath("/spotlight")
        // Not sure if there is a separate category listing page, but better be safe
        revalidatePath("/spotlight/categories")
    } catch (error) {
        console.error("Create category error:", error)
        return { success: false, message: "Nie udało się utworzyć kategorii." }
    }

    redirect("/spotlight")
}
