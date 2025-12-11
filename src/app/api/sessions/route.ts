import { SuccessItemsResponse } from "@fet/responses";
import { sessionManager } from "@fet/services/SessionManager";

export async function GET() {
  return sessionManager.getAll().then(it => SuccessItemsResponse(it));
}