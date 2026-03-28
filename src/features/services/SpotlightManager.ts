import { prisma } from '@/lib/prisma'
import type {
    CreateSpotlightDto,
    UpdateSpotlightDto,
    CreateCategoryDto,
    CreateMediaDto
} from '@/app/(authenticated)/spotlight/sdk'

export class SpotlightManager {

    // ── Spotlight ─────────────────────────────────────────────────────────────────

    getAll(where: { visibility?: string; categorySlug?: string } = {}) {
        return prisma.spotlight.findMany({
            where: {
                isActive: true,
                ...(where.visibility ? { visibility: where.visibility as any } : {}),
                ...(where.categorySlug ? { categories: { some: { slug: where.categorySlug } } } : {}),
            },
            include: { categories: true, media: true },
            orderBy: { createdAt: `desc` },
        })
    }

    getById(id: string) {
        return prisma.spotlight.findUnique({
            where: { id },
            include: { categories: true, media: true },
        })
    }

    create(dto: CreateSpotlightDto) {
        const { categoryIds, ...data } = dto
        return prisma.spotlight.create({
            data: {
                ...data,
                isActive: true,
                visibility: data.visibility as any,
                categories: categoryIds?.length
                    ? { connect: categoryIds.map(id => ({ id })) }
                    : undefined,
            },
            include: { categories: true },
        })
    }

    update(id: string, dto: UpdateSpotlightDto) {
        const { categoryIds, ...data } = dto
        return prisma.spotlight.update({
            where: { id },
            data: {
                ...data,
                visibility: data.visibility as any,
                ...(categoryIds !== undefined
                    ? { categories: { set: categoryIds.map(cid => ({ id: cid })) } }
                    : {}),
            },
            include: { categories: true },
        })
    }

    delete(id: string) {
        return prisma.spotlight.delete({ where: { id } })
    }

    // ── Category ──────────────────────────────────────────────────────────────────

    getAllCategories() {
        return prisma.spotlightCategory.findMany({
            where: { isActive: true },
            orderBy: { order: `asc` },
        })
    }

    getCategoryById(id: string) {
        return prisma.spotlightCategory.findUnique({ where: { id } })
    }

    createCategory(dto: CreateCategoryDto) {
        return prisma.spotlightCategory.create({
            data: {
                ...dto,
                isActive: true,
                order: dto.order ?? 0,
            },
        })
    }

    deleteCategory(id: string) {
        return prisma.spotlightCategory.delete({ where: { id } })
    }

    // ── Media ─────────────────────────────────────────────────────────────────────

    getMediaBySpotlightId(spotlightId: string) {
        return prisma.spotlightMedia.findMany({
            where: { spotlightId },
            orderBy: { createdAt: `desc` },
        })
    }

    createMedia(spotlightId: string, data: CreateMediaDto & { userId: string }) {
        return prisma.spotlightMedia.create({
            data: {
                ...data,
                spotlightId,
            },
        })
    }

    deleteMedia(mediaId: string) {
        return prisma.spotlightMedia.delete({ where: { id: mediaId } })
    }

    // ── Rates ─────────────────────────────────────────────────────────────────────

    getRatesBySpotlightId(spotlightId: string) {
        return prisma.spotlightRate.findMany({
            where: { spotlightId, isActive: true },
            orderBy: { createdAt: `desc` },
        })
    }

    createRate(spotlightId: string, userId: string, value: number) {
        return prisma.spotlightRate.create({
            data: {
                value,
                spotlightId,
                userId,
                isActive: true
            },
        })
    }
    // ── Comments ──────────────────────────────────────────────────────────────────

    async getCommentsBySpotlightId(spotlightId: string) {
        const comments = await prisma.spotlightComment.findMany({
            where: { spotlightId, isActive: true },
            orderBy: { createdAt: `desc` },
        })

        const { userManager } = await import('@/features/services/UserManager');
        return Promise.all(comments.map(async c => {
            const numId = parseInt(c.userId, 10)
            if (!isNaN(numId)) {
                const u = await userManager.findById(numId).catch(() => null)
                return { ...c, userName: u?.name || 'Użytkownik' }
            }
            return { ...c, userName: 'Użytkownik' }
        }))
    }

    async createComment(spotlightId: string, userId: string, content: string) {
        const comment = await prisma.spotlightComment.create({
            data: {
                content,
                spotlightId,
                userId,
                isActive: true
            },
        })

        const { userManager } = await import('@/features/services/UserManager');
        const numId = parseInt(userId, 10)
        let userName = 'Użytkownik'
        if (!isNaN(numId)) {
            const u = await userManager.findById(numId).catch(() => null)
            if (u) userName = u.name
        }

        return { ...comment, userName }
    }

    getCommentById(commentId: string) {
        return prisma.spotlightComment.findUnique({ where: { id: commentId } })
    }

    deleteComment(commentId: string) {
        return prisma.spotlightComment.delete({ where: { id: commentId } })
    }

    // ── Profile ───────────────────────────────────────────────────────────────────

    getUserSpotlights(userId: string) {
        return prisma.spotlight.findMany({
            where: { userId, isActive: true },
            include: { categories: true, media: true },
            orderBy: { createdAt: `desc` }
        })
    }

    getUserComments(userId: string) {
        return prisma.spotlightComment.findMany({
            where: { userId, isActive: true },
            include: { spotlight: { select: { title: true } } },
            orderBy: { createdAt: `desc` }
        })
    }
}

export const spotlightManager = new SpotlightManager()
