import { ApiErrorResponse, SuccessResponse } from "@/responses";
import { driveManager } from "@/services/DriveManager";
import { NextRequest } from "next/server";
import filePath from 'path';
import { DynamicRoute } from "../../validator/[fn]/route";

type DriveDirectoryDynamicRoute = DynamicRoute<{path:string}>

export async function GET(_: NextRequest, {params}: DriveDirectoryDynamicRoute) {
  const { path } = await params
  const relPath = filePath.join(...(path ?? [`/`]))
  const item = await driveManager.check(relPath)

  if(!item) return ApiErrorResponse(10002)

  if(item.type === 'FILE'){
    const file = await driveManager.loadFile(relPath)
    return new Response(file);
  }

  if (item.type === 'DIR'){
    const dirItems = await driveManager.scanDir(relPath)
    return SuccessResponse(dirItems)
  }
}



// export async function POST(req: NextRequest, {params}: DriveDirectoryDynamicRoute) {
//     const { path } = await params
//   const relPath = filePath.join(...(path ?? [`/`]))
//   const item = await driveManager.check(relPath)

//   if(item) return ApiErrorResponse(10005)

//     const cretion = await driveManager.create('')


//   return SuccessResponse(dirItems)
// }