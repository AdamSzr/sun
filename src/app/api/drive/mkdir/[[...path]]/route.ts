import { NextRequest } from "next/server";
import filePath from 'path'

import { driveManager } from "@/services/DriveManager";
import { ApiErrorResponse, SuccessItemsResponse } from "@/responses";
import { DynamicRoute } from "@/app/api/validator/[fn]/route";

type DriveDirectoryDynamicRoute = DynamicRoute<{path:string}>

export async function POST(_: NextRequest, {params}: DriveDirectoryDynamicRoute) {
  const { path } = await params

  const created = await driveManager.mkdir(filePath.join(path))

  if(!created) return ApiErrorResponse(10006)

  else return SuccessItemsResponse()
}
