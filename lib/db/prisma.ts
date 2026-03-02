// ============================================================
// Prisma Client Singleton
// Evita múltiplas instâncias em desenvolvimento (hot reload)
// ============================================================
// Configure DATABASE_URL no .env ou nas variáveis de ambiente:
//   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
// ============================================================

import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
