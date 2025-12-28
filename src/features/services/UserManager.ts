// lib/session-manager.ts

import { hash } from 'crypto'
import { prisma, User } from '@/lib/prisma'


export type UserPayload = Omit<User, `createdAt` | `updatedAt` | `id`>;

export class UserManager {

  create({ name, password: rawPassword }:UserPayload) {
    const password = this.#createHash( rawPassword )
    return prisma.user.create({ data: { name, password } })
  }

  checkNameAvailable( name:string ) {
    return prisma.user.count({ where: { name } }).then( it => it === 0 )
  }

  findUser( name:string, rawPassword:string ) {
    const password = this.#createHash( rawPassword )
    return prisma.user.findFirst({ where: { name, AND: { password } } })
  }

  getAll() {
    return prisma.user.findMany()
  }

  deleteAll() {
    return prisma.user.deleteMany()
  }

  delete( id:number ) {
    return prisma.user.delete({ where: { id } })
  }

  #createHash( text:string ) {
    return hash( `sha256`, text )
  }

}

export const userManager = new UserManager()
