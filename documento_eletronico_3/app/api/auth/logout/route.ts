import { NextResponse } from "next/server"
import { authService } from "@/lib/services/auth.service"

export async function POST() {
  try {
    await authService.logout()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erro ao encerrar sessão" }, { status: 500 })
  }
}
