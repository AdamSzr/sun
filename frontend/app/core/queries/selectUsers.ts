import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"

export default resolver.pipe(async () => {
  // console.log({ userId })

  const users = await db.user.findMany({})

  return users
})
