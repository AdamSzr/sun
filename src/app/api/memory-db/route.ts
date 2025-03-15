import { SuccessResponse } from '@/app/responses';
import { type NextRequest } from 'next/server';

const memoryDb = new Map()

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key') ??''

  const value = memoryDb.get(key) ?? ''
  return SuccessResponse(value)
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type')
  const key = request.nextUrl.searchParams.get('key') ??''
  const body = await (contentType =='application/json' ? request.json(): request.text())

  memoryDb.set(key,body)

  return SuccessResponse()
}