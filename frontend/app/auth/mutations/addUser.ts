import { resolver, SecurePassword } from "blitz"
import db from "db"

export default resolver.pipe(async ({ name, directory }, ctx) => {
  const user = await db.user.create({
    data: { name, directory: directory } as any,
    select: { id: true, name: true },
  })

  await ctx.session.$create({ userId: user.id, name: user.name, directory: directory })
  return { ...user, directory: directory }
})
