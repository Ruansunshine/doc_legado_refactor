import { userRepository } from "@/lib/repositories/user.repository"
import { hashPassword, verifyPassword } from "@/lib/auth/password"
import { createSession, destroySession, getSession } from "@/lib/auth/session"

export const authService = {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email)
    
    if (!user) {
      return { success: false, error: "Credenciais inválidas" }
    }

    if (!user.password) {
      return { success: false, error: "Credenciais inválidas" }
    }

    const valid = await verifyPassword(password, user.password)
    
    if (!valid) {
      return { success: false, error: "Credenciais inválidas" }
    }

    await createSession(user.id)
    
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    }
  },

  async logout() {
    await destroySession()
  },

  async getCurrentUser() {
    const session = await getSession()
    return session?.user ?? null
  },

  async register(data: {
    name: string
    email: string
    password: string
    role?: string
  }) {
    const existing = await userRepository.findByEmail(data.email)
    
    if (existing) {
      return { success: false, error: "E-mail já cadastrado" }
    }

    const passwordHash = await hashPassword(data.password)
    
    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      role: data.role || "DEFAULT",
    })

    return { success: true, user }
  },
}