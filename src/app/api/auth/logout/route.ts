import { withAuth } from "@/auth";
import { SuccessItemsResponse } from "@/responses";
import { AUTH_COOKIE_KEY, sessionManager } from "@/services/SessionManager";
import { cookies } from "next/headers";

export async function POST() {
  return withAuth(async ({ session }) => {
    await sessionManager.deleteSession(session.id)

    const c = await cookies()
    c.set({
      name: AUTH_COOKIE_KEY,
      value: '',
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 0,
    })

    return SuccessItemsResponse()
  })
}
