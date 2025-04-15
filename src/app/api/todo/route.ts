import { ApiErrorResponse, SuccessResponse } from "@/app/responses";
import { prisma } from "@/lib/prisma";
import { TodoItem } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
  const done = req.nextUrl.searchParams.get('done')

  const query = (done && ['true','false'].includes(done)) ? { done:done==='true' } : { }
  const todos = await prisma.todoItem.findMany({where:query})

  return SuccessResponse({todos})
}

export async function POST(req:NextRequest) {
  const todoItem = await req.json()
  const todo = await prisma.todoItem.create({data:todoItem})

  return SuccessResponse(todo)
}

export async function PUT(req:NextRequest) {
  const update:Partial<TodoItem> = await req.json()
  if(!update.id) return ApiErrorResponse(20000)

  const item = await prisma.todoItem.update({where:{id:update.id}, data:update})

  return SuccessResponse(item)
}

export async function DELETE() {

  const item = await prisma.todoItem.deleteMany()

  return SuccessResponse(item)
}