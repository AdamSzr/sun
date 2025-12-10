import path from "path"
import { readdir, mkdir } from "fs/promises"

import { stat, access, constants } from 'fs/promises'

export async function isDir( filePath:string ): Promise<boolean> {
  try {
    const stats = await stat( filePath )
    return stats.isDirectory()
  } catch {
    return false
  }
}

export async function isFile( filePath:string ): Promise<boolean> {
  try {
    const stats = await stat( filePath )
    return stats.isFile()
  } catch {
    return false
  }
}

export async function directoryExist( fullPath:string ): Promise<boolean> {
  try {
    const stats = await stat( fullPath )
    return stats.isDirectory()
  } catch {
    return false
  }
}

export async function fileExists( fullPath:string ): Promise<boolean> {
  return access( fullPath, constants.F_OK ).then( () => true, () => false )
}

export async function createDir( fullPath:string ) {
  return mkdir( fullPath ).then( () => true, () => false )
}

export function getDirStruct( dirPath:string ) {
  return readdir( dirPath )
}

export async function tryFindItemInDir( directory:string, itemName:string ) {
  const itemsInDir = await getDirStruct( directory )
  const requestedItem = itemsInDir.find( f => f == itemName )

  return { requestedItem, itemsInDir }
}

/**
 * @param directory directory that possibly contain item
 * @param itemName item name to search
 * @returns if `requestedItem` is undefined then directory does not contain item, otherwise `requestedItem` is a correct item name with extension
 */
export async function getObjectInfo( directory:string, itemName:string ) {
  const { requestedItem, itemsInDir } = await tryFindItemInDir( directory, itemName )
  const fullPath = path.join( directory, requestedItem ?? `` )

  return { fullPath, requestedItem, itemsInDir }
}
