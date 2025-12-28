import path from 'path'
import { mkdir } from 'fs/promises'
import { promises as fsPromises } from "fs"
import { Logger } from '@fet/Logger'
import { directoryExist, fileExists, getDirStruct, isFile } from '@/utils/file'
import { DiskObject } from "@/app/api/drive/models/DiskObject"
import { DirectoryInfo } from "@/app/api/drive/models/DirectoryInfo"

const driveLogger = new Logger({ logToConsole:true, minLevel:`debug` })

export default class DriveManager {
  publicDirAbs: string
  rootDir: string
  rootDrivePath: string

  constructor( publicDirAbs:string, rootDir:string, rootDrivePath:string ) {
    this.publicDirAbs = publicDirAbs
    this.rootDir = rootDir
    this.rootDrivePath = rootDrivePath
  }

  async check( relPath:string ) {
    const p = path.join( this.rootDrivePath, relPath )

    driveLogger.info( `[Checking path] ${p}` )
    const exists = await fileExists( p )

    if (!exists) return undefined

    return this.#produceDiskObject( p )
  }

  async mkdir( relPath:string ) {
    const absPath = path.join( this.rootDrivePath, relPath )

    return this.check( relPath ).then( diskObj => {
      if (diskObj) {
        driveLogger.error( `Mkdir - Exists "${diskObj.type}" with same path ` )
        return false
      }

      return fsPromises.mkdir( absPath ).then( () => true ) } )
      .then( success => {
        const discObject:DiskObject = {
          type: `DIR`,
          size: 0,
          name: absPath.split( absPath ).at( -1 )!,
          createdAt: new Date(),
        }

        if (success) return discObject
        else return
      } )
      .catch( error => {
        driveLogger.error( `Mkdir ${error[ `message` ]}` )
        return undefined
      } )
  }

  async #produceDiskObject( item:string ): Promise<DiskObject> {
    const z = {} as DiskObject

    const stats = await fsPromises.stat( item )
    z.type = stats.isDirectory() ? `DIR` : `FILE`
    z.size = z.type === `DIR` ? 0 : stats.size
    z.name = item.split( `/` ).at( -1 )!
    z.createdAt = stats.ctime

    return z
  }

  scanDir( relPath:string ) {
    const p = path.join( this.rootDrivePath, relPath )

    driveLogger.info( `Scan - ${p}` )

    return this.#directoryAnalizer( p )
  }

  loadFile( relPath:string ) {
    const p = path.join( this.rootDrivePath, relPath )
    if (!isFile( p )) throw new Error( `Path ${p} is not a file` )

    return fsPromises.readFile( p )
  }

  async saveFile( directory:string, file:File ) {
    const dirPath = path.join( this.rootDrivePath, directory )

    const dirExists = await directoryExist( dirPath )

    if (!dirExists) await mkdir( dirPath )

    const p = path.join( dirPath, file.name )
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from( arrayBuffer )

    try {
      await fsPromises.writeFile( p, buffer )
      return true
    } catch (err) {
      driveLogger.error( `Błąd zapisu pliku:`, err )
      return false
    }
  }

  async #directoryAnalizer( requestPath:string ) {
    const baseDir = requestPath
    const innerObjects = await getDirStruct( baseDir )
    const z = {} as DirectoryInfo
    z.path = requestPath
    z.items = await Promise.all( innerObjects.map( i => this.#produceDiskObject( path.join( baseDir, i ) ) ) )
    return z
  }

}

export const PUBLIC_DIR_ABS_PATH = process.env[ `DATA_ROOT_DIR` ] ?? `/public`
export const rootDir = process.cwd()
export const baseDrivePath = path.join( rootDir, PUBLIC_DIR_ABS_PATH )


export const driveManager = new DriveManager( process.env[ `DATA_ROOT_DIR` ] ?? `/public`, process.cwd(), path.join( rootDir, PUBLIC_DIR_ABS_PATH ) )

