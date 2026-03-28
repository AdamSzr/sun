import { NextRequest } from 'next/server'
import { SuccessResponse, SuccessItemsResponse, ApiErrorResponse } from '@fet/responses'
import { DynamicRoute } from '@fet/index'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { driveManager } from '@fet/services/DriveManager'
import { authUser } from '@fet/auth'

type Params = DynamicRoute<{ id: string }>

export async function GET(_: NextRequest, { params }: Params) {
    const { id } = await params

    const media = await spotlightManager.getMediaBySpotlightId(id)

    return SuccessItemsResponse(media)
}

export async function POST(req: NextRequest, { params }: Params) {
    const authResult = await authUser()
    if (!authResult) return ApiErrorResponse(401)
    const { user } = authResult

    const { id: spotlightId } = await params
    const formData = await req.formData()
    const file = formData.get(`file`) as File | null

    if (!file) return ApiErrorResponse(10008)

    const uploadDir = `spotlight/${spotlightId}`
    const saved = await driveManager.saveFile(uploadDir, file)

    if (!saved) return ApiErrorResponse(500)

    const src = `/drive/spotlight/${spotlightId}/${file.name}`

    const media = await spotlightManager.createMedia(spotlightId, {
        title: file.name,
        description: ``,
        src,
        userId: `${user.id}`,
    })

    return SuccessResponse(media)
}
