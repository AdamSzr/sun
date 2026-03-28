'use server'

import { revalidatePath } from "next/cache"
import { driveManager } from "@fet/services/DriveManager"
import { cookies } from "next/headers"
import auth, { authUser } from "@fet/auth"

export async function createDirectory(formData: FormData) {
  const authResult = await authUser()
  if (!authResult) return
  const { user } = authResult

  const dirName: FormDataEntryValue[] | null = formData.getAll(`dirName`)
  const acctualPath: FormDataEntryValue[] | null = formData.getAll(`acctualPath`)

  const success = await driveManager.mkdir(`${acctualPath}/${dirName}`)

  if (success) revalidatePath(`/drive`)
}
