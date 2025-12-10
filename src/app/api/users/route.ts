import { NextRequest } from "next/server"
import { userPayloadValidator } from "@/validators/user"
import { userManager, UserPayload } from "@/services/UserManager"
import { SuccessItemsResponse, SuccessResponse, ValidationResponse } from "@/responses"
import { withAuth } from "@/auth"

export async function POST( req:NextRequest ) {
  const payload:UserPayload = await req.json()
  const validatorResult = userPayloadValidator.safeParse( payload )

  if (validatorResult.success === false) {
    return ValidationResponse( validatorResult.error )
  }

  const user = await userManager.create( payload )

  return SuccessResponse( user )
}

export async function GET() {
  const users = await userManager.getAll()

  return SuccessItemsResponse( users )
}

export async function DELETE() {
  const users = await userManager.deleteAll()

  return SuccessItemsResponse( users )
}

