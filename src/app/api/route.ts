import { apiErrors } from "../../features/responses/errors"
import { SuccessItemsResponse } from "../../features/responses"

export async function GET() {
  return SuccessItemsResponse({
    errors: apiErrors,
  })
}
