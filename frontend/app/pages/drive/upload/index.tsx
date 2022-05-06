import { Suspense, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { User } from "@prisma/client"

import React from "react"
import { FileUploader, } from "react-drag-drop-files"

type File = {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath:string
}

type FileList = {
  item:(index:number )=>File
  length:number
}

const DriveUploadDnD = () => {
  const x = useCurrentUser() as User
  const pwd = x.directory

  const fileTypes = ["JPG", "PNG", "GIF","*"]

  const [file, setFile] = useState(null as any)

  const handleChange = (file:FileList) => {
    console.log(file.item(0).lastModifiedDate)
    // file.forEach(element => {
    //   console.log({element})
    // });
    setFile(file)
    console.log(file.length)
    console.log(file.item(0))
  }

  return <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={true} minSize={0} />
}

const DriveUpload: BlitzPage = () => {
  return (
    <div className="container">
      <DriveUploadDnD />
    </div>
  )
}

DriveUpload.suppressFirstRenderFlicker = true
DriveUpload.getLayout = (page) => <Layout title="Drive">{page}</Layout>

export default DriveUpload
