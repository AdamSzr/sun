import { withAuth } from "@/auth";
import { SuccessItemsResponse } from "@/responses";


export async function GET() {
  return withAuth(({ session }) => SuccessItemsResponse(session));
}
