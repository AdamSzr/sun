import { Router, Routes } from "blitz"
import path from "path"
import { FileObjectType, getObjectType } from "../models/EnumFileObjectType"

type DriveObjectProps = {
    objectName:string
    onDirectoryClick:(objectName)=>void
    pwd:string
  }

function createUrl(directory: string, fileName: string) {
  return `drive/${directory}/${fileName}`
}

const FILE_ICON_URL = "/file.svg"
const DIR_ICON_URL = "/directory.svg"

export function DriveObject(props: DriveObjectProps) {

  return (
    <div className="driveObject">
      {getObjectType(props.objectName) == FileObjectType.FILE ? <FileObject /> : <DirectoryObject />}
    </div>
  )

  function FileObject() {
    return (
        <a href={createUrl(props.pwd, props.objectName)} download>
          <div>
          <img src={FILE_ICON_URL} />
          {props.objectName}
          </div>
        </a>
    )
  }

  function DirectoryObject() {
    return (
      <div onClick={()=>{ props.onDirectoryClick(props.objectName) }}>
        <img src={DIR_ICON_URL} />
        {props.objectName}
      </div>
    )
  }
}

export default DriveObject
