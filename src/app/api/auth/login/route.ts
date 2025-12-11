import { ApiErrorResponse, SuccessItemsResponse, ValidationResponse } from "@fet/responses";
import { AUTH_COOKIE_KEY, SESSION_TTL_SECONDS, sessionManager } from "@fet/services/SessionManager";
import { userManager } from "@fet/services/UserManager";
import { registerPayloadValidator } from "@fet/validators/login";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { cookies } from 'next/headers';
import { NextRequest, } from "next/server";

type UserLoginRequest = Pick<User, 'name' | 'password'>;

export async function POST(request: NextRequest) {
  const payload = await request.json() as UserLoginRequest;
  const validation = registerPayloadValidator.safeParse(payload);

  if (validation.success === false) {
    return ValidationResponse(validation.error);
  }
  const loginData = validation.data;

  const user = await userManager.findUser(loginData.name, loginData.password);

  if (!user) return ApiErrorResponse(0);

  let session = await prisma.session.findFirst({ where: { userId: user.id } });

  if (!session)
    session = await sessionManager.createSession(user.id, { user });

  const c = await cookies();
  c.set({
    name: AUTH_COOKIE_KEY,
    value: session.id,
    httpOnly: true,
    path: '/',
    secure: true,
    maxAge: SESSION_TTL_SECONDS,
  });


  return SuccessItemsResponse();
}