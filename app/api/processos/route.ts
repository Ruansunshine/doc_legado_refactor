import { NextResponse, type NextRequest } from "next/server"
import { processoService } from "@/lib/services/processo.service"
import { authService } from "@/lib/services/auth.service"
import type { ProcessStatus, DocumentType } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const user = await authService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const filters = {
      search: searchParams.get("search") || undefined,
      status: (searchParams.get("status") as ProcessStatus) || undefined,
      tipo: (searchParams.get("tipo") as DocumentType) || undefined,
      secretariaId: searchParams.get("secretariaId") || undefined,
      page: Number(searchParams.get("page")) || 1,
      perPage: Number(searchParams.get("perPage")) || 20,
    }

    const result = await processoService.list(filters)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
