import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"

export const authenticateUser = async (name: string) => {
  const user = await db.user.findFirst({ where: { name } })
  if (!user) throw new AuthenticationError()
  console.log(user)
  return user
}

export default resolver.pipe(async ({ name }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(name)

  await ctx.session.$create({ userId: user.id, directory: user.directory, name: user.name })
  return user
})
