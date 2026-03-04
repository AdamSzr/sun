import { NextRequest } from 'next/server'
import { SuccessResponse, ApiErrorResponse } from '@fet/responses'
import { DynamicRoute } from '@fet/index'
import { spotlightManager } from '@fet/services/SpotlightManager'

type Params = DynamicRoute<{ id: string }>

export async function GET(_: NextRequest, { params }: Params) {
    const { id } = await params

    const spotlight = await spotlightManager.getById(id)

    if (!spotlight) return ApiErrorResponse(10002)
    return SuccessResponse(spotlight)
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { id } = await params
    const body = await req.json()

    const spotlight = await spotlightManager.update(id, body)

    return SuccessResponse(spotlight)
}

export async function DELETE(_: NextRequest, { params }: Params) {
    const { id } = await params

    const spotlight = await spotlightManager.delete(id)
    return SuccessResponse(spotlight)
}
