// ============================================================
// User Repository - Data access layer
// ============================================================

import { prisma } from "@/lib/db/prisma"

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    })
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    })
  },

  findAll() {
    return prisma.user.findMany({
      include: { accounts: true },
      orderBy: { name: "asc" },
    })
  },

  create(data: {
    name?: string
    email: string
    password?: string
    role?: string
    image?: string
  }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || "DEFAULT",
        image: data.image,
      },
      include: { accounts: true },
    })
  },

  update(id: string, data: {
    name?: string
    email?: string
    password?: string
    role?: string
    image?: string
    emailVerified?: Date
    isTwoFactorAuthEnabled?: boolean
    twoFactorAuthVerified?: Date
  }) {
    return prisma.user.update({
      where: { id },
      data,
      include: { accounts: true },
    })
  },

  delete(id: string) {
    return prisma.user.delete({
      where: { id },
    })
  },
}