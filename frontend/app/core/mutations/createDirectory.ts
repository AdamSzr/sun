import { resolver } from "blitz"
import fs from "fs"

export default resolver.pipe(async (fullDirPath, ctx) => {
  if (!(await fs.existsSync(fullDirPath as any))) {
    await fs.mkdirSync(fullDirPath as any)
    return true
  }
  return false
})
