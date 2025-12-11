import { withAuth } from "@fet/auth";
import { SuccessItemsResponse } from "@fet/responses";


export async function GET() {
  return withAuth(({ session }) => SuccessItemsResponse(session));
}
