import { SuccessResponse } from "../responses";
import { apiErrors } from "../responses/errors";

export async function GET() {
  return SuccessResponse({
    errors: apiErrors,
  })
}