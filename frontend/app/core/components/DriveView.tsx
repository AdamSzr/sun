import { Router, Routes, useQuery } from "blitz"
import path from "path"
import { useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { FileObjectType, getObjectType } from "../models/EnumFileObjectType"
import { DirectoryStructure } from "../models/listDirectoryOutput"
import listDirectory from "../queries/listDirectory"
import { User } from "@prisma/client"
import DriveObject from "./DriveObject"

type DriveViewProps = {
  // name:string
  // directory:string
  pwd: string
  // onDirectoryClick: (pwd:string)=>void
  // updateUi:(pwd:string)=> void
}

export function DriveView(props: DriveViewProps) {
  const [currentPWD, setCurrentPWD] = useState(props.pwd)
  const [stucture, { refetch }] = useQuery(listDirectory, { directory: currentPWD })
  const [history, setHistory] = useState([] as string[])
  const [isLastItemInHistory,setLastItemInHistory] = useState(true)

  async function onDirectoryChange(directoryName: string) {

    setHistory((arr) => {
      arr.push(currentPWD)
      return arr
    })
    setLastItemInHistory(false)

    setCurrentPWD(path.join(currentPWD, directoryName))
    console.log({ history })
    await refetch({})
  }

  function onDirectoryBack() {
    const lastPWD = history.pop()
    setCurrentPWD(()=> lastPWD as string)
    console.log(lastPWD)

    if(history.length==0)
      setLastItemInHistory(true)
  }

  return (
    <div id="driveView">
      <div>{currentPWD}</div>
      {/* {JSON.stringify(stucture.files)} */}
      <button onClick={onDirectoryBack} disabled={isLastItemInHistory}>Wstecz</button>
      {stucture.files.map((elementName) => {
        return (
          <DriveObject
            objectName={elementName}
            onDirectoryClick={onDirectoryChange}
            pwd={currentPWD}
          />
        )
      })}
    </div>
  )
}

export default DriveView
