
export default async function SpotlightPage() {

  return (
    <div>
      Spotlight
    </div>
  )
}

/* {

1. spotlight:
  id
  createdAt
  updatedAt
  title
  description
  userId
  lat
  lng
  isActive: boolean
  visibility: 'public' | 'private'
  SpotlightCategory[]

userSpotlightProfile
  likedSpotlights
  likedComments

SpotlightMedia:
  id
  spotlightId
  title
  description
  createdAt
  updatedAt
  src
  userId: string

SpotlightComment
  id
  createdAt
  updatedAt
  spotlightId
  content
  isActive: boolean
  userId: string


SpotlightMediaComment:
  id
  spotlightId
  mediaId
  createdAt
  updatedAt
  content
  userId: string

SpotlightRate:
  id
  spotlightId
  createdAt
  updatedAt
  value
  userId: string
  isActive: boolean

SpotlightCategory:
  id: string
  name: string
  slug: string
  description?: string
  createdAt: Date
  updatedAt
  iconUrl?: string
  coverImage?: strin
  isActive: boolean
  order: number

*/
