"use client"

import React, { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Text from '@fet/theme/ui/Text'
import { Input, Label, Button, Form, Hint, Flex, Link } from '@fet/theme/ui'
import { login } from './actions'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get(`redirectUrl`) || `/`
  const [state, action, pending] = useActionState(login, { success: null })

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <Form
        action={action}
        variant="clean"
        className="
          relative z-10 w-full max-w-md p-10
          bg-white/[0.03] backdrop-blur-xl
          border border-white/[0.08] rounded-3xl
          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          flex flex-col gap-8
          animate-in fade-in zoom-in duration-500
        "
      >
        <div className="space-y-2 text-center">
          <Text as="h1" className="text-3xl font-bold tracking-tight text-white">
            Witaj ponownie
          </Text>
          <Text as="p" className="text-gray-400 text-sm">
            Zaloguj się do swojego konta Sun
          </Text>
        </div>

        <Input type="hidden" name="redirectUrl" value={redirectUrl} />

        <div className="space-y-5">
          <Flex className="flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
              Nazwa użytkownika
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              className="
                bg-white/[0.05] border-white/[0.1] text-white placeholder-gray-500
                focus:border-orange-500/50 focus:ring-orange-500/20
                h-12 px-4 rounded-xl transition-all
              "
              placeholder="np. jan_kowalski"
            />
          </Flex>

          <Flex className="flex-col gap-2">
            <Label htmlFor="password" title="password" className="text-sm font-medium text-gray-300 ml-1">
              Hasło
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              className="
                bg-white/[0.05] border-white/[0.1] text-white placeholder-gray-500
                focus:border-orange-500/50 focus:ring-orange-500/20
                h-12 px-4 rounded-xl transition-all
              "
              placeholder="••••••••"
            />
          </Flex>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="
            h-12 mt-2 rounded-xl text-md font-semibold
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]
            active:scale-[0.98] transition-all
            flex items-center justify-center gap-2
          "
        >
          {pending ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Logowanie…</span>
            </>
          ) : (
            `Zaloguj się`
          )}
        </Button>

        {state.success === false && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 animate-in slide-in-from-top-1 duration-300">
            <Hint variant="error" className="text-rose-400 text-sm text-center">
              Nieprawidłowa nazwa użytkownika lub hasło
            </Hint>
          </div>
        )}

        <div className="text-center">
          <Text as="p" className="text-gray-500 text-xs">
            Nie masz konta? <Link href="/register" className="text-blue-400 hover:underline">Zarejestruj się</Link>
          </Text>
        </div>
      </Form>
    </div>
  )
}
