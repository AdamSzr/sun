"use client"

import React, { useActionState } from 'react'
import { register } from './actions'

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, { success:null })

  return (
    <form action={action}>
      <input type="text" name="name" />
      <input type="text" name="password" />
      <button type="submit">register</button>
    </form>
  )
}
