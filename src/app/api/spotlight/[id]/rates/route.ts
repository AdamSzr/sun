import { NextRequest } from 'next/server'
import { SuccessResponse, SuccessItemsResponse, ApiErrorResponse } from '@fet/responses'
import { DynamicRoute } from '@fet/index'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { authUser } from '@fet/auth'

type Params = DynamicRoute<{ id: string }>

export async function GET(_: NextRequest, { params }: Params) {
    const { id } = await params
    const rates = await spotlightManager.getRatesBySpotlightId(id)
    return SuccessItemsResponse(rates)
}

export async function POST(req: NextRequest, { params }: Params) {
    const authResult = await authUser()
    if (!authResult) return ApiErrorResponse(401)
    
    const { user } = authResult
    const { id: spotlightId } = await params
    
    const body = await req.json().catch(() => null)
    if (!body || typeof body.value !== 'number') return ApiErrorResponse(10008)

    const rate = await spotlightManager.createRate(spotlightId, `${user.id}`, body.value)

    return SuccessResponse(rate)
}
