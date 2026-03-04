import type {
    Spotlight,
    SpotlightCategory,
    SpotlightComment,
    SpotlightMedia,
    SpotlightMediaComment,
    SpotlightRate,
    UserSpotlightProfile,
} from './types'

import type { SuccessItemResponse, SuccessItemsResponse } from '@fet/responses'

// ── Base ──────────────────────────────────────────────────────────────────────

const BASE = `/api/spotlight`

async function get<T>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`)
    return res.json()
}

async function post<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(url, {
        method: `POST`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`)
    return res.json()
}

async function patch<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(url, {
        method: `PATCH`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`PATCH ${url} failed: ${res.status}`)
    return res.json()
}

async function del<T>(url: string): Promise<T> {
    const res = await fetch(url, { method: `DELETE` })
    if (!res.ok) throw new Error(`DELETE ${url} failed: ${res.status}`)
    return res.json()
}

// ── Spotlight ─────────────────────────────────────────────────────────────────

export type CreateSpotlightDto = Pick<Spotlight, 'title' | 'description' | 'lat' | 'lng' | 'visibility'> & {
    categoryIds?: string[]
}

export type UpdateSpotlightDto = Partial<CreateSpotlightDto & Pick<Spotlight, 'isActive'>>

export const SpotlightSdk = {
    getAll: () =>
        get<SuccessItemsResponse<Spotlight>>(`${BASE}`),

    getById: (id: string) =>
        get<SuccessItemResponse<Spotlight>>(`${BASE}/${id}`),

    create: (dto: CreateSpotlightDto) =>
        post<SuccessItemResponse<Spotlight>>(`${BASE}`, dto),

    update: (id: string, dto: UpdateSpotlightDto) =>
        patch<SuccessItemResponse<Spotlight>>(`${BASE}/${id}`, dto),

    delete: (id: string) =>
        del<SuccessItemResponse<Spotlight>>(`${BASE}/${id}`),
}

// ── Category ──────────────────────────────────────────────────────────────────

export type CreateCategoryDto = Pick<SpotlightCategory, 'name' | 'slug'> &
    Partial<Pick<SpotlightCategory, 'description' | 'iconUrl' | 'coverImage' | 'order'>>

export const SpotlightCategorySdk = {
    getAll: () =>
        get<SuccessItemsResponse<SpotlightCategory>>(`${BASE}/categories`),

    getById: (id: string) =>
        get<SuccessItemResponse<SpotlightCategory>>(`${BASE}/categories/${id}`),

    create: (dto: CreateCategoryDto) =>
        post<SuccessItemResponse<SpotlightCategory>>(`${BASE}/categories`, dto),

    delete: (id: string) =>
        del<SuccessItemResponse<SpotlightCategory>>(`${BASE}/categories/${id}`),
}

// ── Media ─────────────────────────────────────────────────────────────────────

export type CreateMediaDto = Pick<SpotlightMedia, 'title' | 'description' | 'src'>

export const SpotlightMediaSdk = {
    getAll: (spotlightId: string) =>
        get<SuccessItemsResponse<SpotlightMedia>>(`${BASE}/${spotlightId}/media`),

    upload: (spotlightId: string, file: File) => {
        const form = new FormData()
        form.append(`file`, file)
        return fetch(`${BASE}/${spotlightId}/media`, { method: `POST`, body: form }).then<SuccessItemResponse<SpotlightMedia>>(r => r.json())
    },

    delete: (spotlightId: string, mediaId: string) =>
        del<SuccessItemResponse<SpotlightMedia>>(`${BASE}/${spotlightId}/media/${mediaId}`),
}

// ── Comments ──────────────────────────────────────────────────────────────────

export type CreateCommentDto = Pick<SpotlightComment, 'content'>

export const SpotlightCommentSdk = {
    getAll: (spotlightId: string) =>
        get<SuccessItemsResponse<SpotlightComment>>(`${BASE}/${spotlightId}/comments`),

    create: (spotlightId: string, dto: CreateCommentDto) =>
        post<SuccessItemResponse<SpotlightComment>>(`${BASE}/${spotlightId}/comments`, dto),

    delete: (spotlightId: string, commentId: string) =>
        del<SuccessItemResponse<SpotlightComment>>(`${BASE}/${spotlightId}/comments/${commentId}`),
}

// ── Media comments ────────────────────────────────────────────────────────────

export type CreateMediaCommentDto = Pick<SpotlightMediaComment, 'content'>

export const SpotlightMediaCommentSdk = {
    getAll: (spotlightId: string, mediaId: string) =>
        get<SuccessItemsResponse<SpotlightMediaComment>>(`${BASE}/${spotlightId}/media/${mediaId}/comments`),

    create: (spotlightId: string, mediaId: string, dto: CreateMediaCommentDto) =>
        post<SuccessItemResponse<SpotlightMediaComment>>(`${BASE}/${spotlightId}/media/${mediaId}/comments`, dto),

    delete: (spotlightId: string, mediaId: string, commentId: string) =>
        del<SuccessItemResponse<SpotlightMediaComment>>(`${BASE}/${spotlightId}/media/${mediaId}/comments/${commentId}`),
}

// ── Rates ─────────────────────────────────────────────────────────────────────

export type CreateRateDto = Pick<SpotlightRate, 'value'>

export const SpotlightRateSdk = {
    getAll: (spotlightId: string) =>
        get<SuccessItemsResponse<SpotlightRate>>(`${BASE}/${spotlightId}/rates`),

    create: (spotlightId: string, dto: CreateRateDto) =>
        post<SuccessItemResponse<SpotlightRate>>(`${BASE}/${spotlightId}/rates`, dto),

    update: (spotlightId: string, rateId: string, dto: CreateRateDto) =>
        patch<SuccessItemResponse<SpotlightRate>>(`${BASE}/${spotlightId}/rates/${rateId}`, dto),

    delete: (spotlightId: string, rateId: string) =>
        del<SuccessItemResponse<SpotlightRate>>(`${BASE}/${spotlightId}/rates/${rateId}`),
}

// ── User profile ──────────────────────────────────────────────────────────────

export const UserSpotlightProfileSdk = {
    get: (userId: string) =>
        get<SuccessItemResponse<UserSpotlightProfile>>(`${BASE}/profile/${userId}`),

    likeSpotlight: (spotlightId: string) =>
        post<SuccessItemResponse<UserSpotlightProfile>>(`${BASE}/profile/likes/spotlights/${spotlightId}`, {}),

    unlikeSpotlight: (spotlightId: string) =>
        del<SuccessItemResponse<UserSpotlightProfile>>(`${BASE}/profile/likes/spotlights/${spotlightId}`),

    likeComment: (commentId: string) =>
        post<SuccessItemResponse<UserSpotlightProfile>>(`${BASE}/profile/likes/comments/${commentId}`, {}),

    unlikeComment: (commentId: string) =>
        del<SuccessItemResponse<UserSpotlightProfile>>(`${BASE}/profile/likes/comments/${commentId}`),
}
