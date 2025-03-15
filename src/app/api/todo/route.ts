import { SuccessResponse } from "@/app/responses";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todoItem.findMany()

  return SuccessResponse({todos})
}



export async function POST() {
  return SuccessResponse({todos})
}