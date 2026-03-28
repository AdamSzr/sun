import { NextRequest } from 'next/server'
import { SuccessResponse, ApiErrorResponse } from '@fet/responses'
import { DynamicRoute } from '@fet/index'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { driveManager } from '@fet/services/DriveManager'
import { authUser } from '@fet/auth'

type Params = DynamicRoute<{ id: string; mediaId: string }>

export async function DELETE(req: NextRequest, { params }: Params) {
    const authResult = await authUser()
    if (!authResult) return ApiErrorResponse(401)
    
    const { id: spotlightId, mediaId } = await params
    
    // Validate if the user owns the spotlight or media, checking if it exists
    const spotlight = await spotlightManager.getById(spotlightId)
    if (!spotlight) return ApiErrorResponse(404 as any)
    if (spotlight.userId !== String(authResult.user.id)) return ApiErrorResponse(403 as any) // Only spotlight owner can delete media for now

    try {
        const deletedMedia = await spotlightManager.deleteMedia(mediaId)
        if (deletedMedia && deletedMedia.src) {
            // Delete from disk
            // src format is usually `/drive/spotlight/{id}/{filename}` or `/uploads/spotlight/{id}/{filename}`
            // We need to extract the relative path `spotlight/{id}/{filename}`
            let relPath = deletedMedia.src
            if (relPath.startsWith('/drive/')) {
                relPath = relPath.replace('/drive/', '')
            } else if (relPath.startsWith('/uploads/')) {
                relPath = relPath.replace('/uploads/', '')
            }
            await driveManager.deleteFile(relPath)
        }
        return SuccessResponse(deletedMedia)
    } catch (error) {
        return ApiErrorResponse(500)
    }
}
