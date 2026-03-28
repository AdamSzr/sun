import { NextRequest } from 'next/server'
import { SuccessResponse, ApiErrorResponse } from '@fet/responses'
import { DynamicRoute } from '@fet/index'
import { spotlightManager } from '@fet/services/SpotlightManager'
import { authUser } from '@fet/auth'

type Params = DynamicRoute<{ id: string; commentId: string }>

export async function DELETE(req: NextRequest, { params }: Params) {
    const authResult = await authUser()
    if (!authResult) return ApiErrorResponse(401)
    
    const { commentId } = await params
    
    const existingComment = await spotlightManager.getCommentById(commentId)
    if (!existingComment) return ApiErrorResponse(404 as any)
    if (existingComment.userId !== String(authResult.user.id)) return ApiErrorResponse(403 as any)
    
    const comment = await spotlightManager.deleteComment(commentId)

    return SuccessResponse(comment)
}
