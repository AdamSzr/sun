// lib/session-manager.ts

import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';


export type UserPayload = Omit<User, 'createdAt'|'updatedAt'|'id'>

export class UserManager {

  create(payload:UserPayload){
    return  prisma.user.create({data:payload})
  }
  getAll(){
    return  prisma.user.findMany()
  }


}

export const userManager = new UserManager();
