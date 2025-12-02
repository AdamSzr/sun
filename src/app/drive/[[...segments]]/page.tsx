import React from 'react';
import { SuccessItemResponse } from '@/responses';
import Image from 'next/image';
import dirImg from './(assets)/dir.png';
import fileImg from './(assets)/file.png';
import { formatDate } from '@/utils/utils';
import { dirDateFormat } from '@/app/api/drive';
import { DirectoryInfo } from '@/app/api/drive/models/DirectoryInfo';
import { createDirectory, saveFileAction } from './actions';
import Link from '@fet/Link';

const today = formatDate(dirDateFormat);

export type PageProps<T> = {params: Promise<T>};

type DrivePageProps =PageProps<{ segments?: string[]}>;


export default async function page({params}:DrivePageProps) {
  const props = await params;
  const subPath = props.segments?.join('/');
  const directory = props.segments?.at(0) ?? today;

  const loadFiles = subPath && await DriveSdk.loadDirectory(subPath).then(it => it.success === true ? it.item:undefined);
  const baseDirFles = !props.segments ? await DriveSdk.loadDirectory().then(it => it.success === true ? it.item:undefined): undefined;

  const backHref = !props.segments ? '' : props.segments?.slice(0, -1)?.join('/');

  return (
    <div>
      <Link href={`/drive/${backHref}`}>Back</Link>


      {directory === today && (
        <>
          <div className="mb-4 text-lg font-semibold">
            Pliki z dnia {directory}
          </div>

          <div className="flex flex-wrap gap-4 p-3">
            {baseDirFles?.items.map(it => (
              <a
                key={it.createdAt.toString()}
                href={`/drive/${it.name}`}
                className="flex w-36 cursor-pointer flex-col items-center rounded-xl p-3 transition hover:bg-gray-600"
              >
                <Image
                  src={it.type === 'DIR' ? dirImg.src : fileImg.src}
                  width={42}
                  height={42}
                  alt=""
                />
                <p className="mt-2 truncate text-sm font-medium text-white">{it.name}</p>
              </a>
            ))}
          </div>
        </>
      )}



      {loadFiles && (
        <div className="flex flex-wrap gap-4 p-3">
          {loadFiles.items.map(it => (
            it.type === "DIR" ? (
              <a
                key={it.createdAt.toString()}
                href={`/drive/${subPath || today}/${it.name}`}
                className="flex w-36 cursor-pointer flex-col items-center rounded-xl p-3 transition hover:bg-gray-600"
              >
                <Image src={dirImg.src} width={42} height={42} alt="" />
                <p className="mt-2 truncate text-sm font-medium text-white">{it.name}</p>
              </a>
            ) : (
              <a
                key={it.createdAt.toString()}
                href={`/api/drive/${subPath || today}/${it.name}`}
                className="flex w-36 cursor-pointer flex-col items-center rounded-xl p-3 transition hover:bg-gray-600"
              >
                <Image src={fileImg.src} width={42} height={42} alt="" />
                <p className="mt-2 truncate text-sm font-medium text-white">{it.name}</p>
              </a>
            )
          ))}
        </div>
      )}


      <form action={saveFileAction} className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6 shadow">
        <label className="text-sm font-medium text-gray-700">Wybierz plik</label>

        <input
          type="file"
          name="file"
          multiple
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Upload
        </button>
      </form>


      <form action={createDirectory} className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6 shadow">
        <label className="text-sm font-medium text-gray-700">Nazwa katalogu</label>

        <input
          type="text"
          name="dirName"
          placeholder="np. logi, uploads itp."
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          required
        />

        <input
          hidden
          type="text"
          name="acctualPath"
          defaultValue={subPath}
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          mkDir
        </button>
      </form>

    </div>
  );
}

const defaultPath = `http://192.168.1.22:3000` + `/api/drive`;

class DriveSdk {
  static loadDirectory(path?:string){
    if(path) return fetch(`${defaultPath}/${path}`).then<SuccessItemResponse<DirectoryInfo> >(it => it.json());
    else return fetch(`${defaultPath}`).then<SuccessItemResponse<DirectoryInfo> >(it => it.json());
  }

  static loadFile(path:string){
    return fetch(defaultPath + path).then(it => it.blob());
  }
}