import { NextRequest } from 'next/server'
import { SuccessResponse, SuccessItemsResponse, ApiErrorResponse } from '@fet/responses'
import type { CreateCategoryDto } from '@/app/(authenticated)/spotlight/sdk'
import { spotlightManager } from '@fet/services/SpotlightManager'

export async function GET() {
    const categories = await spotlightManager.getAllCategories()
    return SuccessItemsResponse(categories)
}

export async function POST(req: NextRequest) {
    const body: CreateCategoryDto = await req.json()

    if (!body.name || !body.slug) return ApiErrorResponse(400)

    const category = await spotlightManager.createCategory(body)

    return SuccessResponse(category)
}
