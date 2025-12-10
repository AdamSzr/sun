import { ZodError } from "zod"
import { apiErrors } from "./errors"

export const getErrorObject = (error?:keyof typeof apiErrors) => {
  if (!error) return { success: false }
  return {
    success: false,
    message: apiErrors[ error ],
    code: error,
  }
}


export const ExceptionResponse = (error:Error) => {
  const code = 501

  return Response.json({
    success: false,
    message: apiErrors[ code ],
    exceptionMessage: error.message,
    code,
  })
}


export const ApiErrorResponse = (error?:keyof typeof apiErrors) => {
  return Response.json( getErrorObject( error ) )
}


export const AnyErrorResponse = (value?:any) => {
  if (!value) return ApiErrorResponse()

  if (value instanceof Error) return ExceptionResponse( value )
  if (value in apiErrors) return ApiErrorResponse( value )

  return ApiErrorResponse( 500 )
}

export const SuccessResponse = (item?:any, headers?:HeadersInit) => {
  return Response.json( {
    success: true,
    item,
  }, { headers } )
}

export const SuccessItemsResponse = (items?:any, headers?:HeadersInit) => {
  return Response.json( {
    success: true,
    items,
  }, { headers } )
}


export const ValidationResponse = <T>(error:ZodError<T>) => {
  const issue = error.issues.at( 0 )

  if (!issue) throw Error( `Error should have issues.` )

  return Response.json({
    success: false,
    code: 400,
    message: `field: ${issue?.path} - ${issue?.message}`,
  })
}

export const getSuccessObject = () => {
  return { success: true }
}

export type SuccessItemsResponse<T> = {
  success: true
  items: T
};

export type SuccessItemResponse<T> = {
  success: true
  item: T
};
