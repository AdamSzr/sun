import Link from 'next/link'
import { SuccessItemResponse } from '@fet/responses'
import { formatDate } from '@/utils/utils'
import { DirectoryInfo } from '@/app/api/drive/models/DirectoryInfo'
import { createDirectory } from './actions'
import { DiskObject } from '@app/api/drive/models/DiskObject'

const today = formatDate(`DD-MM-YYYY`)

export type PageProps<T> = { params: Promise<T> };
type DrivePageProps = PageProps<{ segments?: string[] }>;

// ── Icons ────────────────────────────────────────────────────────────────────

function FolderIcon({ className = `` }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
    </svg>
  )
}

function FileIcon({ className = `` }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-600">
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
  )
}

function FolderPlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
      <path d="M10.75 11.25a.75.75 0 00-1.5 0v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5h-1.5v-1.5z" />
    </svg>
  )
}

// ── Breadcrumbs ───────────────────────────────────────────────────────────────

function Breadcrumbs({ segments }: { segments?: string[] }) {
  const parts = segments ?? []
  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link href="/drive" className="text-gray-400 hover:text-gray-200 transition-colors">
        Dysk
      </Link>
      {parts.map((seg, i) => {
        const href = `/drive/${parts.slice(0, i + 1).join(`/`)}`
        const isLast = i === parts.length - 1
        return (
          <span key={seg} className="flex items-center gap-1">
            <ChevronRightIcon />
            {isLast ? (
              <span className="text-gray-200 font-medium">{seg}</span>
            ) : (
              <Link href={href} className="text-gray-400 hover:text-gray-200 transition-colors">{seg}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

// ── File/Dir item ─────────────────────────────────────────────────────────────

function FileItem({ href, name, type }: { href: string; name: string; type: `DIR` | `FILE` }) {
  const isDir = type === `DIR`
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 hover:bg-gray-800/70 cursor-pointer"
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${isDir ? `text-yellow-400` : `text-blue-400`} transition-transform duration-200 group-hover:-translate-y-0.5`}>
        {isDir
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

export default async function page({ params }: DrivePageProps) {
  const props = await params
  const segments = props.segments ?? []
  const subPath = segments.join(`/`) ?? ''
  const backHref = segments.slice(0, -1).join(`/`)

  const response = await DriveSdk.loadDirectory(subPath)
  const items = response.success ? response.item.items : []
  const defaultDirectory = subPath || today


  const getDirectoryObjectUrl = (diskElement: DiskObject) => {
    return diskElement.type === `DIR`
      ? subPath === '' ? `/drive/${diskElement.name}` : `/drive/${subPath}/${diskElement.name}`
      : `/api/drive/${subPath}/${diskElement.name}`
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 pt-2">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 px-2">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {props.segments && (
              <Link
                href={`/drive/${backHref}`}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-100 transition-all"
              >
                <ArrowLeftIcon />
              </Link>
            )}
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
            {items && items.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-1">
                {items.map(it => (
                  <FileItem
                    key={it.createdAt.toString()}
                    type={it.type}
                    name={it.name}
                    href={getDirectoryObjectUrl(it)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[280px] gap-3 text-gray-600 rounded-2xl border border-dashed border-gray-800">
                <FolderIcon className="w-12 h-12 text-gray-700" />
                <p className="text-sm">Ten katalog jest pusty</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-64 shrink-0 flex flex-col gap-4">

            {/* Upload */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                <UploadIcon />
                Prześlij plik
              </div>
              <form method="POST" action={`/api/drive/${defaultDirectory}`} encType="multipart/form-data" className="flex flex-col gap-3">
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
                <input hidden type="text" name="acctualPath" defaultValue={defaultDirectory} />
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
  static loadDirectory(path?: string) {
    const url = path ? `${defaultPath}/${path}` : defaultPath
    return fetch(url).then<SuccessItemResponse<DirectoryInfo>>(it => it.json())
  }

  static loadFile(path: string) {
    return fetch(defaultPath + path).then(it => it.blob())
  }
}
