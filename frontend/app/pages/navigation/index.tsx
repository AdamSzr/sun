import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logo from "public/logo.png"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import path from "path"
import { DRIVE_ROOT_DIR } from "app/settings/global"
import createDirectory from "app/core/mutations/createDirectory"
import addUser from "app/auth/mutations/addUser"
import { User } from "@prisma/client"
import listDirectory from "app/core/queries/listDirectory"
import { DirectoryStructure } from "app/core/models/listDirectoryOutput"

const NavigationComponent = () => {
  const x = useCurrentUser() as User
  // const [getFiles] = useMutation(listDirectory)
  // const [done, setDone] = useState(false)
  // const [directory, setDirectory] = useState({files:[],directory:""} as DirectoryStructure)


  return (
    <div id="centeredComponent">

        <table id="navigationCompoment">
            <tr>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.directory}</td>
                <td>{x.createdAt.toLocaleDateString()}</td>
                <td>{x.updatedAt.toLocaleDateString()}</td>
            </tr>
            <tr>
                <td>DYSK</td>
                <td colSpan={4}><a href="/drive">LINK</a></td>
            </tr>
        </table>
    </div>
  )
}

const Navigation: BlitzPage = () => {
  return <div className="container">{NavigationComponent()}</div>
}

Navigation.suppressFirstRenderFlicker = true
Navigation.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Navigation
