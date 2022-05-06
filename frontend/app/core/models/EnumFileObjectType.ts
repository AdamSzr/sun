export enum FileObjectType {
  DIRECTORY = "DIRECTORY",
  FILE = "FILE",
}

export const getObjectType = (fileName: string) => {
  return fileName.includes(".") ? FileObjectType.FILE : FileObjectType.DIRECTORY
}
