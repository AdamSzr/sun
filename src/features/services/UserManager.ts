// lib/session-manager.ts

import { hash } from 'crypto'
import { prisma, User } from '@/lib/prisma'


export type UserPayload = Omit<User, `createdAt` | `updatedAt` | `id`>;

export class UserManager {
  #sanitizeUser<T extends Record<string, any>>(user: T | null) {
    if (!user) return null
    const { password, ...rest } = user
    return rest
  }

  create({ name, password: rawPassword }: UserPayload) {
    const password = this.#createHash(rawPassword)
    return prisma.user.create({ data: { name, password } })
      .then(user => this.#sanitizeUser(user)!)
  }

  checkNameAvailable(name: string) {
    return prisma.user.count({ where: { name } }).then(it => it === 0)
  }

  findUser(name: string, rawPassword: string) {
    const password = this.#createHash(rawPassword)
    return prisma.user.findFirst({ 
      where: { name, AND: { password } },
      include: { role: true, permissions: true }
    })
      .then(user => this.#sanitizeUser(user))
  }

  findById(userId: number) {
    return prisma.user.findFirst({ 
      where: { id: userId },
      include: { role: true, permissions: true }
    })
      .then(user => this.#sanitizeUser(user))
  }

  getAll() {
    return prisma.user.findMany({
      include: { role: true, permissions: true }
    })
      .then(users => users.map(u => this.#sanitizeUser(u)!))
  }

  updateMetadata(userId: number, data: { roleId?: number | null, permissionIds?: number[] }) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        roleId: data.roleId,
        permissions: data.permissionIds ? {
          set: data.permissionIds.map(id => ({ id }))
        } : undefined
      },
      include: { role: true, permissions: true }
    }).then(user => this.#sanitizeUser(user)!)
  }

  getAllRoles() {
    return prisma.role.findMany()
  }

  getAllPermissions() {
    return prisma.permission.findMany()
  }

  createRole(name: string, description?: string) {
    return prisma.role.create({ data: { name, description } })
  }

  createPermission(name: string, description?: string) {
    return prisma.permission.create({ data: { name, description } })
  }

  deleteAll() {
    return prisma.user.deleteMany()
  }

  delete(id: number) {
    return prisma.user.delete({ where: { id } })
      .then(user => this.#sanitizeUser(user)!)
  }

  #createHash(text: string) {
    return hash(`sha256`, text)
  }

}

export const userManager = new UserManager()
