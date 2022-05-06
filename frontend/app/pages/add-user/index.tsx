import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logo from "public/logo.png"
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import path from "path"
import { DRIVE_ROOT_DIR } from "app/settings/global"
import createDirectory from "app/core/mutations/createDirectory"
import addUser from "app/auth/mutations/addUser"

const AddUserComponent = () => {
  const [dirExists]  = useMutation(createDirectory)
  const [createUser] = useMutation(addUser);

  const [name, setName] = useState("")

  async function onClickCb(e) {
    e.preventDefault()

    const directory = name + "-" + uuidv4();
    const fullPath = path.join(DRIVE_ROOT_DIR, directory)
    console.log({fullPath})
    console.log({pathExists:await dirExists(fullPath)})

    console.log( {user:await createUser({name,directory})})
    console.log({ name, directory })
  }
  function onInputChangeCb(e) {
    if (e.target.value != "") {
      const name = e.target.value.toLocaleUpperCase()
      setName(name)
      e.target.value = name
    }
  }

  return (
    <div id="centeredComponent">
      <div id="createUserPanel">
        <form>
          <input type={"text"} placeholder="nazwa użytkownika" onChange={onInputChangeCb} />
          <button type={"submit"} onClick={onClickCb}>
            ADD
          </button>
        </form>
      </div>
    </div>
  )
}

const AddUser: BlitzPage = () => {
  return <div className="container">{AddUserComponent()}</div>
}

AddUser.suppressFirstRenderFlicker = true
AddUser.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default AddUser
