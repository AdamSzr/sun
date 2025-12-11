'use server'

import { revalidatePath } from "next/cache"
import { driveManager } from "@fet/services/DriveManager"

export async function createDirectory( formData:FormData ) {
  const dirName:FormDataEntryValue[] | null = formData.getAll( `dirName` )
  const acctualPath:FormDataEntryValue[] | null = formData.getAll( `acctualPath` )

  const success = await driveManager.mkdir( `${acctualPath}/${dirName}` )

  if (success) revalidatePath( `/drive` )
}
