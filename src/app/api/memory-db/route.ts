import { ApiErrorResponse, SuccessResponse } from '@/app/responses';
import { type NextRequest } from 'next/server';

const memoryDb = new Map()

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')

  if(!key) return ApiErrorResponse(30001)
  if(!memoryDb.has(key)) return ApiErrorResponse(30002)

  return SuccessResponse(memoryDb.get(key))
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type')
  const key = request.nextUrl.searchParams.get('key')

  if(!key) return ApiErrorResponse(30001)
  const body = await (contentType =='application/json' ? request.json(): request.text())

  memoryDb.set(key,body)

  return SuccessResponse()
}

export async function DELETE(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')

  if(!key) return ApiErrorResponse(30001)
  return memoryDb.delete(key) ? SuccessResponse(): ApiErrorResponse(30000)
}