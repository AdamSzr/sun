import { SuccessItemsResponse } from "../../responses";
import { apiErrors } from "../../responses/errors";

export async function GET() {
  return SuccessItemsResponse({
    errors: apiErrors,
  });
}