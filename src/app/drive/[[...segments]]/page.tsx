
import React from 'react'
import { SuccessItemResponse } from '@/responses'
import Image from 'next/image'
import dirImg from './(assets)/dir.png'
import fileImg from './(assets)/file.png'
import { formatDate } from '@/utils/utils'
import { dirDateFormat } from '@/app/api/drive'
import { DirectoryInfo } from '@/app/api/drive/models/DirectoryInfo'
import { createDirectory, saveFileAction } from './actions'

const today = formatDate(dirDateFormat)

export  type PageProps<T> = {params: Promise<T>}

type DrivePageProps =PageProps<{ segments?: string[]}>


export default async function page({params}:DrivePageProps) {
  const props = await params
  const subPath = props.segments?.join('/')
  const directory = props.segments?.at(0) ?? today

  const loadFiles = subPath && await DriveSdk.loadDirectory(subPath).then(it => it.success === true ? it.item:undefined)
  const baseDirFles = !props.segments ? await DriveSdk.loadDirectory().then(it => it.success === true ? it.item:undefined): undefined

  const backHref = !props.segments ? '' : props.segments?.slice(0, -1)?.join('/')

  return (
    <div>
      <a href={`/drive/${backHref}`}>Back</a>


      Pliki: z dnia { directory }

     {directory ===today &&  (
      <div style={{display:'flex', padding:'10px', gap:'10px'}}>
          {
            baseDirFles?.items.map(it => (
              <a key={it.createdAt.toString()} href={`/drive/${it.name}`}>
              <Image src={ it.type ==='DIR'? dirImg.src: fileImg.src} width={30} height={30} alt='' />
              <p>{it.name}</p>
            </a>
            ))
          }
      </div>
     )}


{ loadFiles && (
  <div style={{display:'flex', padding:'10px', gap:'10px'}}>
      {
        loadFiles?.items.map(it => (
             it.type==='DIR'?<a key={it.createdAt.toString()} href={`/drive/${subPath || today}/${it.name}`}>
              <Image src={dirImg.src} width={30} height={30} alt='' />
              <p>{it.name}</p>
            </a>:
                    <a key={it.createdAt.toString()} href={`/api/drive/${subPath || today}/${it.name}`}>
              <Image src={fileImg.src } width={30} height={30} alt='' />
              <p>{it.name}</p>
            </a>
        ))
      }
      </div>
)}

      <form action={saveFileAction}>
        <input type='file' name='file' multiple />
        <button type="submit">
          upload
        </button>
      </form>

      <form action={createDirectory}>
        <input type='string' name='dirName' />
        <input hidden type='string' name='acctualPath' defaultValue={subPath}/>

        <button type="submit">
          mkDir
        </button>
      </form>
    </div>
  )
}

const defaultPath = `http://192.168.1.22:3000` + `/api/drive`

class DriveSdk {
  static loadDirectory(path?:string){
    if(path) return fetch(`${defaultPath}/${path}`).then<SuccessItemResponse<DirectoryInfo> >(it => it.json())
    else return fetch(`${defaultPath}`).then<SuccessItemResponse<DirectoryInfo> >(it => it.json())
  }

  static loadFile(path:string){
    return fetch(defaultPath + path).then(it => it.blob())
  }
}