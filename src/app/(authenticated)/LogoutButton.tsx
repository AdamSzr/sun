"use client"

import React, { useActionState } from 'react'
import { Form, Button } from '@fet/theme/ui'
import { logout } from './actions'

export default function LogoutButton() {
  const [ state, action, pending ] = useActionState( logout, undefined )

  return (
    <Form variant="clean" action={action}>
      <button type="submit">logout</button>
    </Form>
  )
}
