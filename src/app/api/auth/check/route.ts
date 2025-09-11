import { withAuth } from "@/app/features/auth";
import { SuccessItemsResponse } from "@/app/responses";


export async function GET() {
  return withAuth(({session}) =>SuccessItemsResponse(session))
}
