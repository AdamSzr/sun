import React from 'react'
import { authUser } from '@fet/auth'
import { notFound, redirect } from 'next/navigation'
import { userManager } from '@fet/services/UserManager'
import { Text, Flex } from '@fet/theme/ui'
import AdminPanel from './AdminPanel'

export default async function PanelPage() {
    const auth = await authUser()

    // 1. Dostęp tylko dla zalogowanych bóstw
    if (!auth) {
        redirect('/login')
    }

    if (auth.user.role?.name !== 'GOD') {
        // Jeśli to nie GOD, udajemy że strony nie ma lub rzucamy 403
        // Dla bezpieczeństwa rzucimy notFound, żeby nie "leakować" istnienia panelu
        notFound()
    }

    // 2. Pobranie danych do panelu
    const [users, roles, permissions] = await Promise.all([
        userManager.getAll(),
        userManager.getAllRoles(),
        userManager.getAllPermissions()
    ])

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 max-w-7xl mx-auto space-y-12">
            <header className="space-y-2">
                <Text as="h1" className="text-4xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                    Panel Boskości (GOD)
                </Text>
                <Text className="text-gray-400">
                    Witaj, <span className="text-white font-bold">{auth.user.name}</span>. Zarządzaj strukturą uprawnień i ról w systemie Sun.
                </Text>
            </header>

            <AdminPanel 
                users={users as any} 
                roles={roles as any} 
                permissions={permissions as any} 
            />
        </div>
    )
}
