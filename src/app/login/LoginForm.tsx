"use client"

import React, { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Text from '@fet/theme/ui/Text'
import { Input, Label, Button, Form, Hint, Flex } from '@fet/theme/ui'
import { login } from './actions'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get( `redirectUrl` ) || `/`
  const [ state, action, pending ] = useActionState( login, { success:null } )


  return (
    <Form action={action}>
      <Text as="h1" className="text-black text-center">Logowanie</Text>

      <Input type="hidden" name="redirectUrl" value={redirectUrl} />

      <Flex className="flex-col">
        <Label htmlFor="name">
          Nazwa użytkownika
        </Label>
        <Input id="name" type="text" name="name" />
      </Flex>

      <Flex className="flex-col gap-1">
        <Label htmlFor="password">Hasło</Label>
        <Input
          id="password"
          type="password"
          name="password"
        />
      </Flex>


      <Button type="submit" disabled={pending}>
        {pending ? `Logowanie…` : `Zaloguj się`}
      </Button>

      {
        state.success === false && (
          <Hint variant="error">Błędne dane logowania</Hint>
        )
      }
    </Form>
  )
}
