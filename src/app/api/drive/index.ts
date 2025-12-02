import { AnyErrorResponse, ApiErrorResponse, SuccessItemsResponse } from '@/responses';
import { log } from '@/services/Logger';
import { directoryExist, fileExists } from '@/utils/file';
import { readFile, rm, writeFile } from 'fs/promises';
import { type NextRequest } from 'next/server';
import path from 'path';

export const dirDateFormat = `DD-MM-YYYY`;
export const driveLogger = (t:string) =>  log( ` Drive: `+t );

// export async function GET(request: NextRequest) {
//   const requestPath = request.nextUrl.searchParams.get('path')

//   if (requestPath == undefined) return ApiErrorResponse(10000)

//   const requestFullPath = baseDrivePath + requestPath;

//   try {
//     const buffer = await readFile(requestFullPath);
//     return new Response(buffer);
//   } catch {
//     return AnyErrorResponse('Somethik went wrong');
//   }
// }


// export async function POST(request: NextRequest) {
//   const requestPath = request.nextUrl.searchParams.get('path')
//   const override = request.nextUrl.searchParams.get('override') != 'string'
//   const body = await request.arrayBuffer()

//   if (requestPath == undefined) return ApiErrorResponse(10000)

//   const fileFullPath = baseDrivePath + requestPath;

//   const { dir } = path.parse(fileFullPath); //dir is a parent for base, base can contain either DIR name or FILE name (with or without ext)

//   try {
//     if (!directoryExist(dir)) return ApiErrorResponse(10002);
//     const exists = fileExists(fileFullPath)
//     if (override || !exists) {
//       writeFile(fileFullPath, new Uint8Array(body))
//       return SuccessItemsResponse()
//     }
//     else return AnyErrorResponse()
//   } catch (err) {
//     return AnyErrorResponse(err);
//   }
// }



// export async function DELETE(request: NextRequest) {
//   const requestPath = request.nextUrl.searchParams.get('path')

//   if (requestPath == undefined) return ApiErrorResponse(10000)

//   const fileFullPath = baseDrivePath + requestPath

//   try {
//     await rm(fileFullPath)
//   } catch {
//     return ApiErrorResponse();
//   }
// }

