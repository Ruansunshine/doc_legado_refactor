// ============================================================
// Formatting & Display Utilities
// ============================================================

import type { ProcessStatus, DocumentType } from "./types"

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Hoje"
  if (diffDays === 1) return "Ontem"
  if (diffDays < 7) return `${diffDays} dias atrás`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`
  return formatDate(dateString)
}

export function getStatusLabel(status: ProcessStatus): string {
  const map: Record<ProcessStatus, string> = {
    em_andamento: "Em Andamento",
    concluido: "Concluído",
    arquivado: "Arquivado",
    cancelado: "Cancelado",
    pendente: "Pendente",
  }
  return map[status]
}

export function getStatusColor(status: ProcessStatus): string {
  const map: Record<ProcessStatus, string> = {
    em_andamento: "bg-info/10 text-info border-info/20",
    concluido: "bg-success/10 text-success border-success/20",
    arquivado: "bg-muted text-muted-foreground border-border",
    cancelado: "bg-destructive/10 text-destructive border-destructive/20",
    pendente: "bg-warning/10 text-warning-foreground border-warning/20",
  }
  return map[status]
}

export function getDocTypeLabel(type: DocumentType): string {
  const map: Record<DocumentType, string> = {
    oficio: "Ofício",
    memorando: "Memorando",
    portaria: "Portaria",
    decreto: "Decreto",
    requerimento: "Requerimento",
    parecer: "Parecer",
    despacho: "Despacho",
    nota_tecnica: "Nota Técnica",
  }
  return map[type]
}

export function getDocTypeColor(type: DocumentType): string {
  const map: Record<DocumentType, string> = {
    oficio: "bg-primary/10 text-primary border-primary/20",
    memorando: "bg-accent/10 text-accent border-accent/20",
    portaria: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    decreto: "bg-destructive/10 text-destructive border-destructive/20",
    requerimento: "bg-info/10 text-info border-info/20",
    parecer: "bg-success/10 text-success border-success/20",
    despacho: "bg-muted text-muted-foreground border-border",
    nota_tecnica: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  }
  return map[type]
}
