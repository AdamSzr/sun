import { withAuth } from "@/app/features/auth";
import { SuccessItemsResponse } from "@/app/responses";
import { sessionManager } from "@/app/services/SessionManager";


export async function POST() {
  return withAuth( async ({session}) => {
    const del = await sessionManager.deleteSession(session.id)
    console.log(del)

    return SuccessItemsResponse()
  })
}
