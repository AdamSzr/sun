
import { resolver } from "blitz"
import fs from "fs"
import path from "path"
import fsFileTree from "fs-file-tree"
import { DirectoryStructure } from "../models/listDirectoryOutput"
import { env } from "process"

export type Directory = {
  directory: string
}

export default resolver.pipe(async ({ directory }: Directory, ctx) => {
  const fullPath = path.join(env["ROOT_DRIVE_DIR"] || "", directory)
  
  // let directoryStructure = new DirectoryStructure()
  // directoryStructure.directory = fullPath
  let files = fs.readdirSync(fullPath)
  const directoryStructure = new DirectoryStructure(fullPath, files)
  // console.log(directoryStructure)
  return directoryStructure
})
