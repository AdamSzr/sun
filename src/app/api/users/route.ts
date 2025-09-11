import { withAuth } from "@/app/features/auth"
import { SuccessItemsResponse, SuccessResponse, ValidationResponse } from "@/app/responses"
import { userManager, UserPayload } from "@/app/services/UserManager"
import { userPayloadValidator } from "@/app/validators/user"
import { NextRequest } from "next/server"


export async function POST(req:NextRequest) {
  const payload:UserPayload = await req.json()
  const validatorResult = userPayloadValidator.safeParse(payload)

  if(validatorResult.success === false){
    return ValidationResponse(validatorResult.error)
  }

  const user = await userManager.create(payload)

  return SuccessResponse(user)
}


export async function GET() {
  return withAuth(async () =>{
  const users = await userManager.getAll()

  return SuccessItemsResponse(users)
  })
}
