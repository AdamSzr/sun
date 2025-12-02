import { SuccessItemsResponse } from "@/responses";
import { sessionManager } from "@/services/SessionManager";

export async function GET() {
  return sessionManager.getAll().then(it => SuccessItemsResponse(it));
}