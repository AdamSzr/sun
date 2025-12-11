import filePath from 'path'
import { NextRequest } from "next/server"

import { driveManager } from "@fet/services/DriveManager"
import { ApiErrorResponse, SuccessItemsResponse } from "@fet/responses"
import { DynamicRoute } from '@fet/index'

type DriveDirectoryDynamicRoute = DynamicRoute<{ path: string }>;

export async function GET( _:NextRequest, { params }:DriveDirectoryDynamicRoute ) {
  const { path } = await params

  const item = await driveManager.check( filePath.join( ...(path ?? [ `/` ]) ) )

  if (!item) return ApiErrorResponse( 10002 )
  else return SuccessItemsResponse( item )
}
