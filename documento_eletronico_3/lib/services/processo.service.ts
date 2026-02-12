// ============================================================
// Processo Service - Business logic for processos
// ============================================================

import { processoRepository, type ProcessoFilters } from "@/lib/repositories/processo.repository"
import {
  toProcessoResumoVM,
  toProcessoDetalheVM,
  toTramitacaoVM,
  toDashboardStatsVM,
} from "@/lib/viewmodels/processo.viewmodel"

export const processoService = {
  async list(filters: ProcessoFilters) {
    const result = await processoRepository.findMany(filters)

    return {
      processos: result.processos.map(toProcessoResumoVM),
      pagination: {
        total: result.total,
        page: result.page,
        perPage: result.perPage,
        totalPages: result.totalPages,
      },
    }
  },

  async getById(id: string) {
    const processo = await processoRepository.findById(id)
    if (!processo) return null
    return toProcessoResumoVM(processo)
  },

  async getFullDetail(id: string) {
    const processo = await processoRepository.findByIdWithRelations(id)
    if (!processo) return null
    return toProcessoDetalheVM(processo)
  },

  async getDashboardStats(secretariaId?: string) {
    const [stats, recentProcessos, recentTramitacoes] = await Promise.all([
      processoRepository.getStats(secretariaId),
      processoRepository.getRecentProcessos(5, secretariaId),
      processoRepository.getRecentTramitacoes(5),
    ])

    return toDashboardStatsVM(stats, recentProcessos, recentTramitacoes)
  },
}
