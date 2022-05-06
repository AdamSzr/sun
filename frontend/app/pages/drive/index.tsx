import { Suspense, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logo from "public/logo.png"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import path from "path"
import createDirectory from "app/core/mutations/createDirectory"
import addUser from "app/auth/mutations/addUser"
import { User } from "@prisma/client"
import listDirectory from "app/core/queries/listDirectory"
import { DirectoryStructure } from "app/core/models/listDirectoryOutput"
import DriveObject from "app/core/components/DriveObject"
import DriveView from "app/core/components/DriveView"

const DriveModule = () => {
  const x = useCurrentUser() as User
  const pwd =  x.directory
  console.log({pwd})

  return (
    <div id="driveModule">
     <DriveView pwd={pwd}/>
    </div>
  )
}

const Drive: BlitzPage = () => {
  return (
    <div className="container">
      <DriveModule />
    </div>
  )
}

Drive.suppressFirstRenderFlicker = true
Drive.getLayout = (page) => <Layout title="Drive">{page}</Layout>

export default Drive
