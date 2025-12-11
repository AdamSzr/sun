import filePath from 'path'
import { NextRequest } from "next/server"
import { driveManager } from "@fet/services/DriveManager"
import { ApiErrorResponse, SuccessResponse } from "@fet/responses"
import { DynamicRoute } from '@fet/index'
import { DiskObject } from '../models/DiskObject'
import { DirectoryInfo } from '../models/DirectoryInfo'

type DriveDirectoryDynamicRoute = DynamicRoute<{ path: string }>;

export async function GET( _:NextRequest, { params }:DriveDirectoryDynamicRoute ) {
  const { path } = await params
  const relPath = filePath.join( ...(path ?? [ `/` ]) )
  const item = await driveManager.check( relPath )

  if (!item) return ApiErrorResponse( 10002 )

  if (item.type === `FILE`) {
    const file = await driveManager.loadFile( relPath )
    return new Response( file as ArrayBufferView<ArrayBuffer> )
  }

  if (item.type === `DIR`) {
    const dirItems = await driveManager.scanDir( relPath )
    return SuccessResponse( dirItems )
  }
}

export async function POST( req:NextRequest, { params:pendingParams }:DriveDirectoryDynamicRoute ) {
  const formData = await req.formData()
  const files = formData.getAll( `file` ) as File[]
  const prams = await pendingParams
  const relPath = filePath.join( ...(prams.path ?? [ `/` ]) )

  if (!files || files.length === 0) {
    return ApiErrorResponse( 10008 )
  }

  if (files.some( file => !(file instanceof File) ))
    return ApiErrorResponse( 10007 )

  const item = await driveManager.check( `/` + relPath )
  if (!item) return ApiErrorResponse( 10005 )

  const uploaded:DiskObject[] = []

  for (const file of files) {
    if (!file) debugger

    if (await driveManager.saveFile( relPath, file ))
      uploaded.push({ createdAt: new Date(), name: file.name, size: file.size, type:`FILE` })
  }

  const dirInfo:DirectoryInfo = {
    path: relPath,
    items: uploaded,
  }

  return SuccessResponse( dirInfo )
}
