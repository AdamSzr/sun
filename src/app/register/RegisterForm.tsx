"use client"

import React, { useActionState } from 'react'
import Text from '@fet/theme/ui/Text'
import { Button, Flex, Form, Hint, Input, Label } from '@fet/theme/ui'
import { register } from './actions'

export default function RegisterForm() {
  const [ state, action, pending ] = useActionState( register, { success:null } )
  console.log( state )
  return (
    <>
      <Form action={action}>
        <Text as="h2" className="text-black text-center">Register</Text>

        <Flex className="flex-col">
          <Label htmlFor="name">
            Nazwa użytkownika
          </Label>
          <Input type="text" name="name" id="name" />
        </Flex>

        <Flex className="flex-col">
          <Label htmlFor="password">
            Hasło
          </Label>
          <Input
            type="password" name="password" id="password"
          />
        </Flex>
        <Button type="submit">Zarejestruj</Button>

        {state.success === false && <Hint variant="error">{state.message}</Hint>}
      </Form>
    </>
  )
}
