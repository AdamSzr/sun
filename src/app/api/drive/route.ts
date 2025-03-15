import { AnyErrorResponse, ApiErrorResponse, SuccessResponse } from '@/app/responses';
import { directoryAnalizer as DirectoryListResponse } from '@/utils/directoryAnalizer';
import { directoryExist, fileExists, getObjectInfo, isDir } from '@/utils/file';
import { readFile, writeFile } from 'fs/promises';
import { type NextRequest } from 'next/server';
import path from 'path';

const PUBLIC_DIR_ABS_PATH = process.env['DATA_ROOT_DIR'] ?? '/public'
const rootDir = process.cwd()
const baseDrivePath = path.join(rootDir, PUBLIC_DIR_ABS_PATH)

export async function GET(request: NextRequest) {
  const requestPath = request.nextUrl.searchParams.get('path') || '/'
  const list = typeof request.nextUrl.searchParams.get('list') != 'string'

  if (requestPath == undefined) return ApiErrorResponse(10000)

  const requestFullPath = baseDrivePath + requestPath;

  const { dir, base } = path.parse(requestFullPath); //dir is a parent for base, base can contain either DIR name or FILE name (with or without ext)

  try {
    if (!directoryExist(dir)) return ApiErrorResponse(10002);

    const { fullPath, requestedItem } = await getObjectInfo(dir, base);

    if (!requestedItem) return ApiErrorResponse(10003);

    if (isDir(fullPath))
      if (list) {
          const dirInfo = await DirectoryListResponse(baseDrivePath, requestPath);
          return SuccessResponse(dirInfo);
      }
      else return ApiErrorResponse(10001);

      const buffer = await readFile(fullPath);
      return new Response(buffer);
    } catch (err) {
      return AnyErrorResponse(err);
    }
}

export async function POST(request: NextRequest) {
  const requestPath = request.nextUrl.searchParams.get('path')
  const override = request.nextUrl.searchParams.get('override') != 'string'
  const body = await request.text()

  if (requestPath == undefined) return ApiErrorResponse(10000)

  const fileFullPath = baseDrivePath + requestPath;

  const { dir } = path.parse(fileFullPath); //dir is a parent for base, base can contain either DIR name or FILE name (with or without ext)

  try {
    if (!directoryExist(dir)) return ApiErrorResponse(10002);
    const exists = fileExists(fileFullPath)
    if(override || !exists) {
      writeFile(fileFullPath, body)
      return new Response()
    }
    else return AnyErrorResponse()
  } catch (err) {
    return AnyErrorResponse(err);
  }
}



