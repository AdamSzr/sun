"use server"

import { userManager } from "@fet/services/UserManager"
import { authUser } from "@fet/auth"
import { revalidatePath } from "next/cache"

export async function updateUserMetadata(userId: number, data: { roleId: number | null, permissionIds: number[] }) {
    const auth = await authUser()
    
    // Safety check: Only GOD can update metadata
    if (!auth || auth.user.role?.name !== 'GOD') {
        return { success: false, message: 'Brak uprawnień (Tylko GOD).' }
    }

    try {
        const updatedUser = await userManager.updateMetadata(userId, {
            roleId: data.roleId,
            permissionIds: data.permissionIds
        })
        
        revalidatePath('/panel')
        return { success: true, user: updatedUser }
    } catch (error) {
        console.error('Failed to update user metadata:', error)
        return { success: false, message: 'Wystąpił błąd serwera.' }
    }
}

export async function createRole(name: string, description?: string) {
    const auth = await authUser()
    if (!auth || auth.user.role?.name !== 'GOD') return { success: false }
    
    await userManager.createRole(name, description)
    revalidatePath('/panel')
    return { success: true }
}

export async function createPermission(name: string, description?: string) {
    const auth = await authUser()
    if (!auth || auth.user.role?.name !== 'GOD') return { success: false }
    
    await userManager.createPermission(name, description)
    revalidatePath('/panel')
    return { success: true }
}
