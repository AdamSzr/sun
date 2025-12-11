import filePath from 'path'
import { NextRequest } from "next/server"

import { driveManager } from "@fet/services/DriveManager"
import { ApiErrorResponse, SuccessItemsResponse } from "@fet/responses"
import { DynamicRoute } from '@fet/index'

type DriveDirectoryDynamicRoute = DynamicRoute<{ path: string }>;

export async function POST( _:NextRequest, { params }:DriveDirectoryDynamicRoute ) {
  const { path } = await params

  const created = await driveManager.mkdir( filePath.join( path ) )

  if (!created) return ApiErrorResponse( 10006 )

  else return SuccessItemsResponse()
}
