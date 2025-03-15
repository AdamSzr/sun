import { readdir } from "fs/promises";
import fs from "fs";
import path from "path";

export function isDir(filePath: string) {
  return fs.statSync(filePath).isDirectory();
}

export function isFile(filePath: string) {
  return fs.statSync(filePath).isFile();
}

export function directoryExist(fullPath: string) {
  return fs.existsSync(fullPath);
}

export function fileExists(fullPath: string) {
  return fs.existsSync(fullPath);
}

export async function getDirStruct(dirPath: string) {
  return await readdir(dirPath);
}

export async function tryFindItemInDir(directory: string, itemName: string) {
  const itemsInDir = await getDirStruct(directory);
  const requestedItem = itemsInDir.find((f) => f == itemName);

  return { requestedItem, itemsInDir };
}

/**
 * @param directory directory that possibly contain item
 * @param itemName item name to search
 * @returns if `requestedItem` is undefined then directory does not contain item, otherwise `requestedItem` is a correct item name with extension
 */
export async function getObjectInfo(directory: string, itemName: string) {
  const { requestedItem, itemsInDir } = await tryFindItemInDir(directory, itemName)
  const fullPath = path.join(directory, requestedItem ?? '')

  return { fullPath, requestedItem, itemsInDir }
}
