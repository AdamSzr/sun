import Link from 'next/link'
import { ArrowLeftIcon, ChevronRightIcon, FileIcon, FolderIcon, FolderPlusIcon, UploadIcon } from '@lib/icons'
import { SuccessItemResponse } from '@fet/responses'
import { DiskObject } from '@app/api/drive/models/DiskObject'
import { formatDate } from '@/utils/utils'
import { DirectoryInfo } from '@/app/api/drive/models/DirectoryInfo'
import { createDirectory } from './actions'

const today = formatDate( `DD-MM-YYYY` )

export type PageProps<T> = { params: Promise<T> };
type DrivePageProps = PageProps<{ segments?: string[] }>;


// ── Breadcrumbs ───────────────────────────────────────────────────────────────

function Breadcrumbs({ segments }:{ segments?: string[] }) {
  const parts = segments ?? []
  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link href="/drive" className="text-gray-400 hover:text-gray-200 transition-colors">
        Dysk
      </Link>
      {
        parts.map( (seg, i) => {
          const href = `/drive/${parts.slice( 0, i + 1 ).join( `/` )}`
          const isLast = i === parts.length - 1
          return (
            <span key={seg} className="flex items-center gap-1">
              <ChevronRightIcon />
              {
                isLast ? (
                  <span className="text-gray-200 font-medium">{seg}</span>
                ) : (
                  <Link href={href} className="text-gray-400 hover:text-gray-200 transition-colors">{seg}</Link>
                )
              }
            </span>
          )
        } )
      }
    </nav>
  )
}

// ── File/Dir item ─────────────────────────────────────────────────────────────

function FileItem({ href, name, type }:{ href: string, name: string, type: `DIR` | `FILE` }) {
  const isDir = type === `DIR`
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 hover:bg-gray-800/70 cursor-pointer"
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${isDir ? `text-yellow-400` : `text-blue-400`} transition-transform duration-200 group-hover:-translate-y-0.5`}>
        {
          isDir
            ? <FolderIcon className="w-10 h-10" />
            : <FileIcon className="w-9 h-9" />
        }
      </div>
      <p className="w-full truncate text-center text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
        {name}
      </p>
    </a>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function page({ params }:DrivePageProps) {
  const props = await params
  const segments = props.segments ?? []
  const subPath = segments.join( `/` ) ?? ``
  const backHref = segments.slice( 0, -1 ).join( `/` )

  const response = await DriveSdk.loadDirectory( subPath )
  const items = response.success ? response.item.items : []


  const getDirectoryObjectUrl = (diskElement:DiskObject) => {
    return diskElement.type === `DIR`
      ? subPath === `` ? `/drive/${diskElement.name}` : `/drive/${subPath}/${diskElement.name}`
      : `/api/drive/${subPath}/${diskElement.name}`
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 pt-2">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 px-2">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {
              props.segments && (
                <Link
                  href={`/drive/${backHref}`}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100 transition-all"
                >
                  <ArrowLeftIcon />
                </Link>
              )
            }
            <Breadcrumbs segments={props.segments} />
          </div>

          <div className="text-xs text-gray-500 tabular-nums">
            {items?.length ?? 0} element{(items?.length ?? 0) !== 1 ? `ów` : ``}
          </div>
        </div>

        {/* Main layout */}
        <div className="flex gap-6 items-start">

          {/* File grid */}
          <div className="flex-1 min-h-[300px]">
            {
              items && items.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-1">
                  {
                    items.map( it => (
                      <FileItem
                        key={it.createdAt.toString()}
                        type={it.type}
                        name={it.name}
                        href={getDirectoryObjectUrl( it )}
                      />
                    ) )
                  }
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[280px] gap-3 text-gray-600 rounded-2xl border border-dashed border-gray-800">
                  <FolderIcon className="w-12 h-12 text-gray-700" />
                  <p className="text-sm">Ten katalog jest pusty</p>
                </div>
              )
            }
          </div>

          {/* Sidebar */}
          <aside className="w-64 shrink-0 flex flex-col gap-4">

            {/* Upload */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                <UploadIcon />
                Prześlij plik
              </div>
              <form method="POST" action={`/api/drive/${subPath || today}`} encType="multipart/form-data" className="flex flex-col gap-3">
                <label className="flex flex-col gap-1.5 cursor-pointer">
                  <span className="text-xs text-gray-500">Wybierz plik(i)</span>
                  <div className="relative">
                    <input
                      type="file"
                      name="file"
                      multiple
                      className="
                        block w-full text-xs text-gray-400
                        file:mr-3 file:py-1.5 file:px-3
                        file:rounded-lg file:border-0
                        file:bg-gray-700 file:text-gray-200 file:text-xs file:font-medium
                        hover:file:bg-gray-600 file:cursor-pointer file:transition-colors
                        focus:outline-none
                      "
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-[.98] py-2 text-sm font-medium text-white transition-all duration-150"
                >
                  Upload
                </button>
              </form>
            </div>

            {/* Create dir */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                <FolderPlusIcon />
                Nowy katalog
              </div>
              <form action={createDirectory} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="dirName"
                  defaultValue={today}
                  placeholder="np. logi, uploads…"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition"
                  required
                />
                <input hidden type="text" name="acctualPath" defaultValue={subPath} />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gray-700 hover:bg-gray-600 active:scale-[.98] py-2 text-sm font-medium text-gray-200 transition-all duration-150"
                >
                  Utwórz
                </button>
              </form>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}

// ── SDK ───────────────────────────────────────────────────────────────────────

const defaultPath = `http://192.168.1.22:3000/api/drive`

class DriveSdk {
  static loadDirectory( path?:string ) {
    const url = path ? `${defaultPath}/${path}` : defaultPath
    return fetch( url ).then<SuccessItemResponse<DirectoryInfo>>(it => it.json())
  }

  static loadFile( path:string ) {
    return fetch( defaultPath + path ).then( it => it.blob() )
  }
}
