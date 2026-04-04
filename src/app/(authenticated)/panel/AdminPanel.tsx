"use client"

import React, { useActionState, useState } from 'react'
import { Text, Flex, Button, Input, Form } from '@fet/theme/ui'
import { updateUserMetadata } from './actions'

type User = {
    id: number
    name: string
    role?: { id: number, name: string } | null
    permissions: { id: number, name: string }[]
}

type Role = { id: number, name: string }
type Permission = { id: number, name: string }

type Props = {
    users: User[]
    roles: Role[]
    permissions: Permission[]
}

export default function AdminPanel({ users: initialUsers, roles, permissions }: Props) {
    const [users, setUsers] = useState(initialUsers)

    const handleUpdate = async (userId: number, roleId: number | null, permissionIds: number[]) => {
        const res = await updateUserMetadata(userId, { roleId, permissionIds })
        if (res.success) {
            setUsers(prev => prev.map(u => u.id === userId ? res.user : u))
            alert('Zaktualizowano uprawnienia użytkownika!')
        } else {
            alert(res.message || 'Wystąpił błąd.')
        }
    }

    return (
        <div className="space-y-12">
            <section className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-white/[0.08]">
                    <Text as="h2" className="text-2xl font-bold text-white">Zarządzanie Użytkownikami</Text>
                    <Text className="text-gray-400">Przydzielaj role i uprawnienia członkom społeczności.</Text>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] text-xs uppercase tracking-widest text-gray-500 font-bold">
                                <th className="px-8 py-4">Użytkownik</th>
                                <th className="px-8 py-4">Rola</th>
                                <th className="px-8 py-4">Uprawnienia</th>
                                <th className="px-8 py-4 text-right">Akcje</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {users.map(user => (
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    roles={roles}
                                    permissions={permissions}
                                    onUpdate={handleUpdate}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Role */}
                <section className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 space-y-6">
                    <div>
                        <Text as="h3" className="text-xl font-bold text-white">Nowa Rola</Text>
                        <Text className="text-sm text-gray-500 text-gray-400">Zdefiniuj nową grupę uprawnień (np. MODERATOR).</Text>
                    </div>
                    <Form action={async (formData) => {
                        const name = formData.get('name') as string
                        const desc = formData.get('description') as string
                        const { createRole } = await import('./actions')
                        const res = await createRole(name, desc)
                        if (res.success) alert('Stworzono rolę!')
                    }} className="space-y-4">
                        <Input name="name" placeholder="Nazwa roli (np. ADMIN)" className="bg-white/5 border-white/10 text-white rounded-xl" required />
                        <Input name="description" placeholder="Krótki opis..." className="bg-white/5 border-white/10 text-white rounded-xl" />
                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 rounded-xl font-bold">Stwórz Rolę</Button>
                    </Form>
                </section>

                {/* Create Permission */}
                <section className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 space-y-6">
                    <div>
                        <Text as="h3" className="text-xl font-bold text-white">Nowe Uprawnienie</Text>
                        <Text className="text-sm text-gray-400">Zdefiniuj konkretną akcję (np. DELETE_ANY_COMMENT).</Text>
                    </div>
                    <Form action={async (formData) => {
                        const name = formData.get('name') as string
                        const desc = formData.get('description') as string
                        const { createPermission } = await import('./actions')
                        const res = await createPermission(name, desc)
                        if (res.success) alert('Stworzono uprawnienie!')
                    }} className="space-y-4">
                        <Input name="name" placeholder="Klucz uprawnienia (np. BAN_USERS)" className="bg-white/5 border-white/10 text-white rounded-xl" required />
                        <Input name="description" placeholder="Opis działania..." className="bg-white/5 border-white/10 text-white rounded-xl" />
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl font-bold">Stwórz Uprawnienie</Button>
                    </Form>
                </section>
            </div>
        </div>
    )
}

function UserRow({ user, roles, permissions, onUpdate }: {
    user: User,
    roles: Role[],
    permissions: Permission[],
    onUpdate: (userId: number, roleId: number | null, permissionIds: number[]) => void
}) {
    const [selectedRole, setSelectedRole] = useState<number | string>(user.role?.id || '')
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>(user.permissions.map(p => p.id))

    const handlePermToggle = (permId: number) => {
        setSelectedPermissions(prev =>
            prev.includes(permId) ? prev.filter(id => id !== permId) : [...prev, permId]
        )
    }

    return (
        <tr className="hover:bg-white/[0.01] transition-colors">
            <td className="px-8 py-6">
                <Flex className="items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-white/10">
                        <span className="text-orange-400 font-bold">{user.name[0].toUpperCase()}</span>
                    </div>
                    <div>
                        <Text className="font-bold text-white">{user.name}</Text>
                        <Text className="text-xs text-gray-500 text-mono">ID: {user.id}</Text>
                    </div>
                </Flex>
            </td>
            <td className="px-8 py-6">
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="bg-white/5 border border-white/10 text-white rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-orange-500/50"
                >
                    <option value="">Brak roli</option>
                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
            </td>
            <td className="px-8 py-6">
                <div className="flex flex-wrap gap-1.5 max-w-sm">
                    {permissions.map(p => (
                        <button
                            key={p.id}
                            onClick={() => handlePermToggle(p.id)}
                            className={`
                                px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter transition-all
                                ${selectedPermissions.includes(p.id)
                                    ? 'bg-blue-500 text-white border-blue-400'
                                    : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10'}
                                border
                            `}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </td>
            <td className="px-8 py-6 text-right">
                <Button
                    onClick={() => onUpdate(user.id, selectedRole ? Number(selectedRole) : null, selectedPermissions)}
                    className="bg-white/5 hover:bg-white/10 text-white text-xs px-4 h-9 rounded-lg border border-white/10 transition-all active:scale-95"
                >
                    Zapisz
                </Button>
            </td>
        </tr>
    )
}
