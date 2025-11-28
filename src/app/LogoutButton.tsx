"use client"

import React, { useActionState } from 'react'
import { logout } from './actions'

export default function LogoutButton() {
    const [state, action, pending] = useActionState(logout, undefined)
  
    return (
      <form action={action}>
        <button type="submit">logout</button>
      </form>
    )
}
