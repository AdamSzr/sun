// lib/session-manager.ts

import { prisma } from '@/lib/prisma';
import { Session } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';

export const SESSION_TTL_SECONDS = 1000 * 60 * 60 * 24; // 24h

export const AUTH_COOKIE_KEY = 'sessionId'


export class SessionManager {

  async createSession(userId: number, data?: InputJsonValue): Promise<Session> {
    const sessionPayload = {
      expiresAt: new Date(new Date().getTime() + SESSION_TTL_SECONDS),
      userId,
      data
    }

    const session = await prisma.session.create({ data: sessionPayload })

    return session;
  }

  getSession(sessionId: string) {
    return prisma.session.findFirst({ where: { id: sessionId } })
  }

  getSessionByUserId(userId: number) {
    return prisma.session.findFirst({ where: { userId } })
  }

  deleteSession(sessionId: string) {
    return prisma.session.delete({ where: { id: sessionId } })
  }

  getAll() {
    return prisma.session.findMany()
  }
}

export const sessionManager = new SessionManager();
