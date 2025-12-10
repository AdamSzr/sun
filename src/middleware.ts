import { NextResponse, type NextRequest } from 'next/server'

export function middleware( req:NextRequest ) {
  const res = NextResponse.next()

  // Ustaw nagłówek w odpowiedzi
  res.headers.set( `x-invoke-path`, req.nextUrl.pathname )

  return res
}

export const config = {
  matcher:`/:path*`,
}
