// ============================================================
// Session Management - JWT + HTTP-only Cookies
// ============================================================

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";

const SESSION_COOKIE = "conecta_session";
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "default-dev-secret-change-in-production",
);
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .setIssuedAt()
    .sign(SECRET);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET)
    const userId = payload.userId as string

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    })

    // valida sessão
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await prisma.session.delete({ where: { id: session.id } })
      }
      return null
    }

    // busca usuário documental + setor
    const usuario = await prisma.usuario.findFirst({
      where: { email: session.user.email },
      include: {
        usuario_setor: {
          include: { setor: true },
        },
      },
    })

    const setor = usuario?.usuario_setor?.[0]?.setor ?? null

    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      },
    }
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { token } });
    cookieStore.delete(SESSION_COOKIE);
  }
}
