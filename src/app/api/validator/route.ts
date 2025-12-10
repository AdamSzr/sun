import validator from 'validator'


export async function OPTIONS( request:Request ) {
  return Response.json({
    result: true,
    functions: Object.keys( validator ),
  })
}
