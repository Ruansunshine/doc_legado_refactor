// ============================================================
// Processo Repository - Data access layer
// ============================================================

import { prisma } from "@/lib/db/prisma"
import type { ProcessStatus, DocumentType } from "@prisma/client"

export interface ProcessoFilters {
  search?: string
  status?: ProcessStatus
  tipo?: DocumentType
  secretariaId?: string
  page?: number
  perPage?: number
}

export const processoRepository = {
  async findMany(filters: ProcessoFilters = {}) {
    const { search, status, tipo, secretariaId, page = 1, perPage = 20 } = filters

    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { numero: { contains: search, mode: "insensitive" } },
        { assunto: { contains: search, mode: "insensitive" } },
        { interessado: { contains: search, mode: "insensitive" } },
      ]
    }
    if (status) where.status = status
    if (tipo) where.tipo = tipo
    if (secretariaId) where.secretariaOrigemId = secretariaId

    const [processos, total] = await Promise.all([
      prisma.processo.findMany({
        where,
        include: {
          secretariaOrigem: true,
          criador: true,
          _count: {
            select: {
              documentos: true,
              tramitacoes: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.processo.count({ where }),
    ])

    return { processos, total, page, perPage, totalPages: Math.ceil(total / perPage) }
  },

  findById(id: string) {
    return prisma.processo.findUnique({
      where: { id },
      include: {
        secretariaOrigem: true,
        criador: true,
        _count: {
          select: {
            documentos: true,
            tramitacoes: true,
          },
        },
      },
    })
  },

  findByIdWithRelations(id: string) {
    return prisma.processo.findUnique({
      where: { id },
      include: {
        secretariaOrigem: true,
        criador: true,
        documentos: {
          include: {
            assinaturas: true,
            anexos: true,
            criadoPor: true,
          },
          orderBy: { createdAt: "asc" },
        },
        tramitacoes: {
          include: {
            setorOrigem: true,
            setorDestino: true,
            responsavel: true,
          },
          orderBy: { dataEnvio: "asc" },
        },
        notas: {
          include: { autor: true },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            documentos: true,
            tramitacoes: true,
          },
        },
      },
    })
  },

  async getStats(secretariaId?: string) {
    const where = secretariaId ? { secretariaOrigemId: secretariaId } : {}

    const [total, emAndamento, concluidos, pendentes] = await Promise.all([
      prisma.processo.count({ where }),
      prisma.processo.count({ where: { ...where, status: "EM_ANDAMENTO" } }),
      prisma.processo.count({ where: { ...where, status: "CONCLUIDO" } }),
      prisma.processo.count({ where: { ...where, status: "PENDENTE" } }),
    ])

    return { total, emAndamento, concluidos, pendentes }
  },

  getRecentProcessos(limit = 5, secretariaId?: string) {
    const where = secretariaId ? { secretariaOrigemId: secretariaId } : {}

    return prisma.processo.findMany({
      where,
      include: {
        secretariaOrigem: true,
        _count: {
          select: { documentos: true, tramitacoes: true },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
    })
  },

  getRecentTramitacoes(limit = 5) {
    return prisma.tramitacao.findMany({
      include: {
        setorOrigem: true,
        setorDestino: true,
        responsavel: true,
        processo: true,
      },
      orderBy: { dataEnvio: "desc" },
      take: limit,
    })
  },
}
