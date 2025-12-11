import { SuccessItemsResponse } from "@fet/responses"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const geoCord = await prisma.geoCord.findMany()

  return SuccessItemsResponse({ geoCord })
}

type GeoCords = { lat: number, long: number };

export async function POST( request:Request ) {
  const cords:GeoCords = await request.json()

  await prisma.geoCord.create({
    data: {
      ...cords,
      path: {
        connect: { id: 1 },
      },
    },
  })

  return SuccessItemsResponse( cords )
}


export async function DELETE() {
  await prisma.geoCord.deleteMany()

  return SuccessItemsResponse()
}

