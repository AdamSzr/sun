/* eslint-disable @typescript-eslint/no-explicit-any */
import validator from 'validator'
import { DynamicRoute } from '@fet/index'
import getFunctionDocs from './validatorDocs'

type ValidatorDynamicRoute = DynamicRoute<{ fn: string }>;

export async function POST( request:Request, { params }:ValidatorDynamicRoute ) {
  const { text, args = [] } = await request.json()
  const { fn } = await params


  return Response.json({
    result: (validator as any)[ fn ]( text, ...args ),
  })
}

const fnParamRegex = /\((?<fnParams>.+)\)/
export async function OPTIONS( request:Request, { params }:ValidatorDynamicRoute ) {
  const { fn } = await params
  const z = (Number( 5 ))

  const fnDocs = getFunctionDocs( fn ) ?? {}
  return Response.json({
    result: true,
    ...fnDocs,
  })
}
