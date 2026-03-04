import { NextRequest } from 'next/server'
import { SuccessResponse, ApiErrorResponse } from '@fet/responses'
import { DynamicRoute } from '@fet/index'
import { spotlightManager } from '@fet/services/SpotlightManager'

type Params = DynamicRoute<{ id: string }>

export async function GET(_: NextRequest, { params }: Params) {
    const { id } = await params

    const category = await spotlightManager.getCategoryById(id)
    if (!category) return ApiErrorResponse(10002)

    return SuccessResponse(category)
}

export async function DELETE(_: NextRequest, { params }: Params) {
    const { id } = await params

    const category = await spotlightManager.deleteCategory(id)
    return SuccessResponse(category)
}
