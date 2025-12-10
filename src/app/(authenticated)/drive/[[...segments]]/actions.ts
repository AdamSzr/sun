'use server'

import { revalidatePath } from "next/cache"
import { dirDateFormat } from "@app/api/drive"
import { formatDate } from "@/utils/utils"
import { driveManager } from "@/services/DriveManager"

export async function saveFileAction( formData:FormData ) {
  // const file = formData.get('file') as File | null;

  const file:FormDataEntryValue[] | null = formData.getAll( `file` )
  if (!file || file.length === 0) return
  const validatedFiles = file.filter( it => typeof it !== `string` && it.size > 0 ) as File[]

  const success = await Promise.all( validatedFiles.map( file => driveManager.saveFile( formatDate( dirDateFormat ), file ) ) )

  if (success) revalidatePath( `/drive` )
  // return {successes}
  // if (!file) {
  //   throw new Error('Brak pliku');
  // }

  // // Konwersja File → Buffer
  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  // revalidatePath('/posts')


  // // Ścieżka do katalogu /uploads (w katalogu projektu)
  // const uploadDir = path.join(process.cwd(), 'uploads');
  // await mkdir(uploadDir, { recursive: true });

  // // Zapis pliku
  // const filePath = path.join(uploadDir, file.name);
  // await writeFile(filePath, buffer);

  // console.log(`✅ Zapisano: ${filePath}`);
}

export async function createDirectory( formData:FormData ) {
  const dirName:FormDataEntryValue[] | null = formData.getAll( `dirName` )
  const acctualPath:FormDataEntryValue[] | null = formData.getAll( `acctualPath` )

  const success = await driveManager.mkdir( `${acctualPath}/${dirName}` )

  if (success) revalidatePath( `/drive` )
}
