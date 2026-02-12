// ============================================================
// Export API - Exporta processo como CSV ou texto estruturado
// GET /api/processos/:id/export?format=csv|txt
// ============================================================

import { NextResponse, type NextRequest } from "next/server"
import { processoService } from "@/lib/services/processo.service"
import { authService } from "@/lib/services/auth.service"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const tipoLabels: Record<string, string> = {
  oficio: "Oficio",
  memorando: "Memorando",
  portaria: "Portaria",
  decreto: "Decreto",
  requerimento: "Requerimento",
  parecer: "Parecer",
  despacho: "Despacho",
  nota_tecnica: "Nota Tecnica",
}

const statusLabels: Record<string, string> = {
  em_andamento: "Em Andamento",
  concluido: "Concluido",
  arquivado: "Arquivado",
  cancelado: "Cancelado",
  pendente: "Pendente",
}

function buildCSV(processo: any): string {
  const lines: string[] = []

  // Header info
  lines.push("PROCESSO ELETRONICO - CONECTA SAO LUIS")
  lines.push("")
  lines.push("Campo,Valor")
  lines.push(`Numero,${processo.numero}`)
  lines.push(`Tipo,${tipoLabels[processo.tipo] ?? processo.tipo}`)
  lines.push(`Status,${statusLabels[processo.status] ?? processo.status}`)
  lines.push(`Assunto,"${processo.assunto}"`)
  lines.push(`Interessado,"${processo.interessado}"`)
  lines.push(`Origem,${processo.secretariaOrigemSigla} - ${processo.secretariaOrigemNome}`)
  lines.push(`Criador,"${processo.criadorNome}"`)
  lines.push(`Data Criacao,${formatDate(processo.dataCriacao)}`)
  lines.push(`Ultima Atualizacao,${formatDate(processo.dataAtualizacao)}`)
  if (processo.observacao) {
    lines.push(`Observacao,"${processo.observacao}"`)
  }

  // Documentos
  if (processo.documentos?.length > 0) {
    lines.push("")
    lines.push("DOCUMENTOS")
    lines.push("Titulo,Tipo,Criado Por,Data,Assinaturas,Anexos")
    for (const doc of processo.documentos) {
      const sigs = doc.assinaturas?.map((s: any) => `${s.signatario} (${s.cargo})`).join("; ") ?? ""
      const anexos = doc.anexos?.map((a: any) => a.nome).join("; ") ?? ""
      lines.push(`"${doc.titulo}",${tipoLabels[doc.tipo] ?? doc.tipo},"${doc.criadoPor}",${formatDate(doc.dataCriacao)},"${sigs}","${anexos}"`)
    }
  }

  // Tramitacoes
  if (processo.tramitacoes?.length > 0) {
    lines.push("")
    lines.push("TRAMITACOES")
    lines.push("Origem,Destino,Data Envio,Data Recebimento,Status,Responsavel,Despacho")
    for (const t of processo.tramitacoes) {
      lines.push(`${t.setorOrigemSigla},${t.setorDestinoSigla},${formatDate(t.dataEnvio)},${t.dataRecebimento ? formatDate(t.dataRecebimento) : "-"},${t.status},"${t.responsavel}","${t.despacho ?? ""}"`)
    }
  }

  // Notas
  if (processo.notas?.length > 0) {
    lines.push("")
    lines.push("NOTAS INTERNAS")
    lines.push("Autor,Data,Tipo,Conteudo")
    for (const n of processo.notas) {
      lines.push(`"${n.autor}",${formatDate(n.dataCriacao)},${n.privada ? "Privada" : "Publica"},"${n.conteudo}"`)
    }
  }

  return lines.join("\n")
}

function buildTXT(processo: any): string {
  const lines: string[] = []
  const sep = "=".repeat(60)
  const sep2 = "-".repeat(40)

  lines.push(sep)
  lines.push("  PROCESSO ELETRONICO - CONECTA SAO LUIS")
  lines.push(sep)
  lines.push("")
  lines.push(`Numero:      ${processo.numero}`)
  lines.push(`Tipo:        ${tipoLabels[processo.tipo] ?? processo.tipo}`)
  lines.push(`Status:      ${statusLabels[processo.status] ?? processo.status}`)
  lines.push(`Assunto:     ${processo.assunto}`)
  lines.push(`Interessado: ${processo.interessado}`)
  lines.push(`Origem:      ${processo.secretariaOrigemSigla} - ${processo.secretariaOrigemNome}`)
  lines.push(`Criador:     ${processo.criadorNome}`)
  lines.push(`Criado em:   ${formatDate(processo.dataCriacao)}`)
  lines.push(`Atualizado:  ${formatDate(processo.dataAtualizacao)}`)
  if (processo.observacao) {
    lines.push(`Observacao:  ${processo.observacao}`)
  }

  if (processo.documentos?.length > 0) {
    lines.push("")
    lines.push(sep)
    lines.push("  DOCUMENTOS")
    lines.push(sep)
    for (const doc of processo.documentos) {
      lines.push("")
      lines.push(sep2)
      lines.push(`  ${doc.titulo}`)
      lines.push(sep2)
      lines.push(`  Tipo: ${tipoLabels[doc.tipo] ?? doc.tipo}`)
      lines.push(`  Criado por: ${doc.criadoPor} em ${formatDate(doc.dataCriacao)}`)
      lines.push("")
      lines.push(doc.conteudo)

      if (doc.assinaturas?.length > 0) {
        lines.push("")
        lines.push("  Assinaturas:")
        for (const s of doc.assinaturas) {
          lines.push(`    - ${s.signatario} (${s.cargo}) [${s.tipo}] ${s.valida ? "Valida" : "Invalida"} - ${formatDate(s.dataAssinatura)}`)
        }
      }

      if (doc.anexos?.length > 0) {
        lines.push("")
        lines.push("  Anexos:")
        for (const a of doc.anexos) {
          lines.push(`    - ${a.nome} (${a.tamanho})`)
        }
      }
    }
  }

  if (processo.tramitacoes?.length > 0) {
    lines.push("")
    lines.push(sep)
    lines.push("  HISTORICO DE TRAMITACAO")
    lines.push(sep)
    for (const t of processo.tramitacoes) {
      lines.push("")
      lines.push(`  ${t.setorOrigemSigla} -> ${t.setorDestinoSigla}`)
      lines.push(`  Enviado: ${formatDate(t.dataEnvio)}${t.dataRecebimento ? ` | Recebido: ${formatDate(t.dataRecebimento)}` : ""}`)
      lines.push(`  Status: ${t.status} | Responsavel: ${t.responsavel}`)
      if (t.despacho) {
        lines.push(`  Despacho: ${t.despacho}`)
      }
    }
  }

  if (processo.notas?.length > 0) {
    lines.push("")
    lines.push(sep)
    lines.push("  NOTAS INTERNAS")
    lines.push(sep)
    for (const n of processo.notas) {
      lines.push("")
      lines.push(`  [${n.privada ? "PRIVADA" : "PUBLICA"}] ${n.autor} - ${formatDate(n.dataCriacao)}`)
      lines.push(`  ${n.conteudo}`)
    }
  }

  lines.push("")
  lines.push(sep)
  lines.push(`  Exportado em: ${new Date().toLocaleString("pt-BR")}`)
  lines.push(sep)

  return lines.join("\n")
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 })
    }

    const { id } = await params
    const processo = await processoService.getFullDetail(id)

    if (!processo) {
      return NextResponse.json({ error: "Processo nao encontrado" }, { status: 404 })
    }

    const format = request.nextUrl.searchParams.get("format") ?? "csv"

    if (format === "txt") {
      const content = buildTXT(processo)
      return new NextResponse(content, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="processo_${processo.numero.replace(/\./g, "_")}.txt"`,
        },
      })
    }

    const content = buildCSV(processo)
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="processo_${processo.numero.replace(/\./g, "_")}.csv"`,
      },
    })
  } catch {
    return NextResponse.json({ error: "Erro ao exportar" }, { status: 500 })
  }
}
