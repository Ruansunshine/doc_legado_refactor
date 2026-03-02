// ============================================================
// View Models - Transform Prisma models for the frontend
// Maps enums to frontend format, picks only needed fields
// ============================================================

/* eslint-disable @typescript-eslint/no-explicit-any */

// Enum mappers (Prisma UPPER_CASE -> frontend snake_case)
const statusMap: Record<string, string> = {
  EM_ANDAMENTO: "em_andamento",
  CONCLUIDO: "concluido",
  ARQUIVADO: "arquivado",
  CANCELADO: "cancelado",
  PENDENTE: "pendente",
}

const tipoMap: Record<string, string> = {
  OFICIO: "oficio",
  MEMORANDO: "memorando",
  PORTARIA: "portaria",
  DECRETO: "decreto",
  REQUERIMENTO: "requerimento",
  PARECER: "parecer",
  DESPACHO: "despacho",
  NOTA_TECNICA: "nota_tecnica",
}

const signatureTypeMap: Record<string, string> = {
  DIGITAL: "digital",
  FISICA: "fisica",
}

const tramStatusMap: Record<string, string> = {
  ENVIADO: "enviado",
  RECEBIDO: "recebido",
  DEVOLVIDO: "devolvido",
}

export function toProcessoResumoVM(p: any) {
  return {
    id: p.id,
    numero: p.numero,
    tipo: tipoMap[p.tipo] || p.tipo,
    assunto: p.assunto,
    status: statusMap[p.status] || p.status,
    dataCriacao: p.createdAt.toISOString(),
    dataAtualizacao: p.updatedAt.toISOString(),
    secretariaOrigemSigla: p.secretariaOrigem?.sigla ?? "",
    secretariaOrigemNome: p.secretariaOrigem?.nome ?? "",
    secretariaOrigemId: p.secretariaOrigemId,
    criadorNome: p.criador?.name ?? "",
    interessado: p.interessado,
    observacao: p.observacao,
    totalDocumentos: p._count?.documentos ?? 0,
    totalTramitacoes: p._count?.tramitacoes ?? 0,
  }
}

export function toDocumentoVM(d: any) {
  return {
    id: d.id,
    processoId: d.processoId,
    titulo: d.titulo,
    tipo: tipoMap[d.tipo] || d.tipo,
    conteudo: d.conteudo,
    dataCriacao: d.createdAt.toISOString(),
    criadoPor: d.criadoPor?.name ?? "",
    assinaturas: (d.assinaturas ?? []).map((s: any) => ({
      id: s.id,
      documentoId: s.documentoId,
      signatario: s.signatario,
      cargo: s.cargo,
      dataAssinatura: s.dataAssinatura.toISOString(),
      tipo: signatureTypeMap[s.tipo] || s.tipo,
      valida: s.valida,
    })),
    anexos: (d.anexos ?? []).map((a: any) => ({
      id: a.id,
      documentoId: a.documentoId,
      nome: a.nome,
      tipo: a.tipo,
      tamanho: a.tamanho,
      dataUpload: a.dataUpload.toISOString(),
      url: a.url,
    })),
  }
}

export function toTramitacaoVM(t: any) {
  return {
    id: t.id,
    processoId: t.processoId,
    setorOrigemNome: t.setorOrigem?.nome ?? "",
    setorOrigemSigla: t.setorOrigem?.sigla ?? "",
    setorDestinoNome: t.setorDestino?.nome ?? "",
    setorDestinoSigla: t.setorDestino?.sigla ?? "",
    dataEnvio: t.dataEnvio.toISOString(),
    dataRecebimento: t.dataRecebimento?.toISOString() ?? null,
    despacho: t.despacho,
    responsavel: t.responsavel?.name ?? "",
    status: tramStatusMap[t.status] || t.status,
  }
}

export function toNotaInternaVM(n: any) {
  return {
    id: n.id,
    processoId: n.processoId,
    autor: n.autor?.name ?? "",
    conteudo: n.conteudo,
    dataCriacao: n.createdAt.toISOString(),
    privada: n.privada,
  }
}

export function toProcessoDetalheVM(p: any) {
  return {
    ...toProcessoResumoVM(p),
    documentos: (p.documentos ?? []).map(toDocumentoVM),
    tramitacoes: (p.tramitacoes ?? []).map(toTramitacaoVM),
    notas: (p.notas ?? []).map(toNotaInternaVM),
  }
}

export function toDashboardStatsVM(
  stats: { total: number; emAndamento: number; concluidos: number; pendentes: number },
  recentProcessos: any[],
  recentTramitacoes: any[]
) {
  return {
    totalProcessos: stats.total,
    emAndamento: stats.emAndamento,
    concluidos: stats.concluidos,
    pendentes: stats.pendentes,
    processosRecentes: recentProcessos.map(toProcessoResumoVM),
    tramitacoesRecentes: recentTramitacoes.map(toTramitacaoVM),
  }
}
