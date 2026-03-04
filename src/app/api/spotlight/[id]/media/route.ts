import { NextRequest } from 'next/server'
import { SuccessResponse, SuccessItemsResponse, ApiErrorResponse } from '@fet/responses'
import { DynamicRoute } from '@fet/index'
import { spotlightManager } from '@fet/services/SpotlightManager'

type Params = DynamicRoute<{ id: string }>

export async function GET(_: NextRequest, { params }: Params) {
    const { id } = await params

    const media = await spotlightManager.getMediaBySpotlightId(id)

    return SuccessItemsResponse(media)
}

export async function POST(req: NextRequest, { params }: Params) {
    const { id: spotlightId } = await params
    const formData = await req.formData()
    const file = formData.get(`file`) as File | null

    if (!file) return ApiErrorResponse(10008)

    // TODO: zintegruj z DriveManager lub innym storage gdy będzie gotowy
    const src = `/uploads/spotlight/${spotlightId}/${file.name}`

    const media = await spotlightManager.createMedia(spotlightId, {
        title: file.name,
        description: ``,
        src,
        userId: ``, // TODO: wstrzyknij z sesji
    })

    return SuccessResponse(media)
}
