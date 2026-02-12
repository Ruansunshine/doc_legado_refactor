import { NextResponse } from "next/server"
import { processoService } from "@/lib/services/processo.service"
import { authService } from "@/lib/services/auth.service"

export async function GET() {
  try {
    const user = await authService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const stats = await processoService.getDashboardStats(user.secretariaId)
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
