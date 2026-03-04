
// ── Shared base ───────────────────────────────────────────────────────────────

type Timestamped = {
    createdAt: Date
    updatedAt: Date
}

// ── Category ──────────────────────────────────────────────────────────────────

export type SpotlightCategory = Timestamped & {
    id: string
    name: string
    slug: string
    description?: string
    iconUrl?: string
    coverImage?: string
    isActive: boolean
    order: number
}

// ── Spotlight (główny wpis) ───────────────────────────────────────────────────

export type Spotlight = Timestamped & {
    id: string
    title: string
    description: string
    userId: string
    lat: number
    lng: number
    isActive: boolean
    visibility: 'public' | 'friends' | 'private'
    categories: SpotlightCategory[]
}

// ── Media ─────────────────────────────────────────────────────────────────────

export type SpotlightMedia = Timestamped & {
    id: string
    spotlightId: string
    title: string
    description: string
    src: string
    userId: string
}

// ── Komentarze ────────────────────────────────────────────────────────────────

export type SpotlightComment = Timestamped & {
    id: string
    spotlightId: string
    content: string
    isActive: boolean
    userId: string
}

export type SpotlightMediaComment = Timestamped & {
    id: string
    spotlightId: string
    mediaId: string
    content: string
    userId: string
}

// ── Ocena ─────────────────────────────────────────────────────────────────────

export type SpotlightRate = Timestamped & {
    id: string
    spotlightId: string
    value: number
    userId: string
    isActive: boolean
}

// ── Profil użytkownika ────────────────────────────────────────────────────────

export type UserSpotlightProfile = {
    userId: string
    likedSpotlights: string[]   // spotlight IDs
    likedComments: string[]     // comment IDs
}
