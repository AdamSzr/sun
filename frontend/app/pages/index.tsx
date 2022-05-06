import { Suspense, useEffect } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logo from "public/logo.png"
import UserCard from "app/core/components/UserCard"
import selectAllUsers from "app/core/queries/selectUsers"
import { User } from "@prisma/client"
import loginUser from "app/auth/mutations/loginUser"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const SelectUser = () => {
  let users = useQuery(selectAllUsers, {}) as any
  users = users[0] as User[]
  const [login] = useMutation(loginUser)

  return (
    <div id="centeredComponent">
      <div id="userPanel">
        {users.map((u) => (
          <UserCard
            onClickCb={async (name) => {
              const user = await login({ name })
              console.log({ name, user })
              Router.push(Routes.Navigation())
            }}
            url="https://randomuser.me/api/portraits/men/75.jpg"
            name={u.name}
          ></UserCard>
        ))}


        <UserCard
          onClickCb={(name) => console.log(name)}
          name="DODAJ"
          url="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1024px-OOjs_UI_icon_add.svg.png"
        />
      </div>
    </div>
  )
}

const Home: BlitzPage = () => {
  return <div className="container">{SelectUser()}</div>
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
