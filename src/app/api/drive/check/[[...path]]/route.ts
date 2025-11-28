import { NextRequest } from "next/server";
import filePath from 'path'

import { driveManager } from "@/services/DriveManager";
import { ApiErrorResponse, SuccessItemsResponse } from "@/responses";
import { DynamicRoute } from "@/app/api/validator/[fn]/route";

type DriveDirectoryDynamicRoute = DynamicRoute<{path:string}>

export async function GET(_: NextRequest, {params}: DriveDirectoryDynamicRoute) {
  const { path } = await params

  const item = await driveManager.check(filePath.join(...(path ?? [`/`])))

  if(!item) return ApiErrorResponse(10002)
  else return SuccessItemsResponse(item)
}
