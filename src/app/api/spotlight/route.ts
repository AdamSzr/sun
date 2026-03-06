import { NextRequest } from 'next/server'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { SuccessResponse, SuccessItemsResponse, ApiErrorResponse } from '@fet/responses'
import type { CreateSpotlightDto } from '@/app/(authenticated)/spotlight/sdk'

export async function GET( req:NextRequest ) {
  const { searchParams } = req.nextUrl
  const visibility = searchParams.get( `visibility` ) ?? undefined
  const categorySlug = searchParams.get( `category` ) ?? undefined

  const spotlights = await spotlightManager.getAll({ visibility, categorySlug })

  return SuccessItemsResponse( spotlights )
}

export async function POST( req:NextRequest ) {
  const body:CreateSpotlightDto = await req.json()

  if (!body.title || !body.lat || !body.lng) return ApiErrorResponse( 400 )

  const spotlight = await spotlightManager.create( body )

  return SuccessResponse( spotlight )
}
