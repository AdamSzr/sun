import fs from "fs";
import path from "path";
import { getDirStruct } from "./file";
import { DiskObject } from "@/app/api/drive/models/DiskObject";
import { DirectoryInfo } from "@/app/api/drive/models/DirectoryInfo";

function produceDiskObject(dir: string, item: string) {
  const z = {} as DiskObject;
  const stats = fs.statSync(path.join(dir, item));
  z.type = stats.isDirectory() ? "DIR" : "FILE";
  z.size = z.type == "DIR" ? 0 : stats.size;
  z.name = item;
  z.createdAt = stats.ctime
  return z;
}

export async function directoryAnalizer(baseDrivePath: string, requestPath: string) {
  const baseDir = baseDrivePath + requestPath
  const innerObjects = await getDirStruct(baseDir)
  const z = {} as DirectoryInfo;
  z.path = requestPath;
  z.items = innerObjects.map((i) => produceDiskObject(baseDir, i));
  return z;
}
