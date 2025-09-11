import { SuccessItemsResponse } from "@/app/responses";
import { sessionManager } from "@/app/services/SessionManager";

export async function GET() {
  return sessionManager.getAll().then(it => SuccessItemsResponse(it))
}