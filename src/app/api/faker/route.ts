import { NextRequest, NextResponse } from "next/server";
import { faker } from '@faker-js/faker';
import { getByPath } from "dot-path-value";

export async function POST(request: NextRequest) {
  const c = request.nextUrl.searchParams.get("count");
  const count = Number(c ?? 1) || 1;

  const placeholder:Record<string,string> = await request.json()

  if(count === 1) return NextResponse.json(randomizer(placeholder))
  else return NextResponse.json(range(count).map( () => randomizer(placeholder)))
}

function randomizer(placeholder:Record<string,string>){
  const filledObject = Object.entries(placeholder).map(([key,path]) =>[key, getByPath((faker as any), path)() ])
  const obj = Object.fromEntries(filledObject)
  return obj
}

function range(n:number) {
  return Array.from({ length: n }, (_, i) => i);
}