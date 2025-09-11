import { ApiErrorResponse, SuccessItemsResponse, ValidationResponse } from "@/app/responses";
import { AUTH_COOKIE_KEY, SESSION_TTL_SECONDS, sessionManager } from "@/app/services/SessionManager";
import { loginPayloadValidator } from "@/app/validators/login";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { cookies } from 'next/headers';
import { NextRequest, } from "next/server";

type UserLoginRequest = Pick<User,'name'| 'password' >

export const COOKIE_EXPIRE_TIME = 60 * 60 * 24 //in seconds

export async function POST(request: NextRequest) {
    const payload = await request.json() as UserLoginRequest
  const validation = loginPayloadValidator.safeParse(payload)
  
  if(validation.success===false){
    return ValidationResponse(validation.error)
  }
  const loginData = validation.data

  const user = await prisma.user.findFirst({where: {name:loginData.name, AND:{ password:loginData.password }}})

  if(!user) return ApiErrorResponse(0)
    
   let session = await prisma.session.findFirst({where: {userId:user.id}})

   if(!session)
    session = await sessionManager.createSession(user.id,{user})

   const c = await cookies()
   c.set({
      name: AUTH_COOKIE_KEY,
      value: session.id ,
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: SESSION_TTL_SECONDS,
    })


    return SuccessItemsResponse()
}