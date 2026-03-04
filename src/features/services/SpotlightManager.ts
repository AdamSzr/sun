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
            include: { categories: true },
            orderBy: { createdAt: `desc` },
        })
    }

    getById(id: string) {
        return prisma.spotlight.findUnique({
            where: { id },
            include: { categories: true },
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
}

export const spotlightManager = new SpotlightManager()
