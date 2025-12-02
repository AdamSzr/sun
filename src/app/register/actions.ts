
'use server';

import { ApiErrorResponse, getErrorObject, getSuccessObject, ValidationResponse } from "@/responses";
import { AUTH_COOKIE_KEY, SESSION_TTL_SECONDS, sessionManager } from "@/services/SessionManager";
import { userManager } from "@/services/UserManager";
import { registerPayloadValidator } from "@/validators/login";
import { User } from "@prisma/client";
import { cookies } from "next/headers";


type RegisterRequest = Pick<User, 'name' | 'password'>;
export type RegisterResponse = {
  success: boolean | null;
  message?: string;
  code?: number;
};

export async function register(prev: RegisterResponse, formData: FormData): Promise<RegisterResponse> {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const payload: RegisterRequest = { name, password };
  const validation = registerPayloadValidator.safeParse(payload);

  if (validation.success === false) {
    return getErrorObject(400);
  }

  const loginData = validation.data;

  const nameAvailable = await userManager.checkNameAvailable(loginData.name);

  if (!nameAvailable) return {
    success: false,
    message: 'Name is currently taken',
    code: 402,
  };

  const user = await userManager.create({ name, password });

  return getSuccessObject();
}