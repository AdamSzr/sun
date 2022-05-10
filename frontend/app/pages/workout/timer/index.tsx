import { Suspense, useEffect } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logo from "public/logo.png"
import UserCard from "app/core/components/UserCard"
import selectAllUsers from "app/core/queries/selectUsers"
import { User } from "@prisma/client"
import loginUser from "app/auth/mutations/loginUser"
import WorkoutTimerComponent from "app/core/components/WorkoutTimer"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const SelectUser = () => {
  let users = useQuery(selectAllUsers, {}) as any
  users = users[0] as User[]
  const [login] = useMutation(loginUser)

  return (
    <div id="workoutTimer">
        TIMER
        <WorkoutTimerComponent/>
    </div>
  )
}

const WorkoutTimer: BlitzPage = () => {
  return <div className="container">{SelectUser()}</div>
}

WorkoutTimer.suppressFirstRenderFlicker = true
WorkoutTimer.getLayout = (page) => <Layout title="WorkoutTimer">{page}</Layout>

export default WorkoutTimer
