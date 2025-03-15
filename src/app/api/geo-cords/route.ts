import { SuccessResponse } from "@/app/responses"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const geoCord = await prisma.geoCord.findMany()

  return SuccessResponse({geoCord})
}



export async function POST() {
  const data = {
    ...generateRandomGeoPath(),
  }

  await prisma.geoCord.create({data: {
    ...data,
    path:{
     connect: { id:1 }
    }
  }})

  return SuccessResponse(data)
}


function generateRandomGeoPath( center = [52.0, 19.0], range = 0.1) {
    const lat = center[0] + (Math.random() - 0.5) * range * 2;
    const long = center[1] + (Math.random() - 0.5) * range * 2;

    return {lat,long}
}