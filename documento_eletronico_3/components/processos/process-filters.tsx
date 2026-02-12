"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import type { ProcessStatus, DocumentType } from "@/lib/types"

interface ProcessFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: ProcessStatus | "all"
  onStatusChange: (value: ProcessStatus | "all") => void
  typeFilter: DocumentType | "all"
  onTypeChange: (value: DocumentType | "all") => void
}

export function ProcessFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
}: ProcessFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por número, assunto ou interessado..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as ProcessStatus | "all")}>
        <SelectTrigger className="w-full sm:w-[180px] h-10">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Status</SelectItem>
          <SelectItem value="em_andamento">Em Andamento</SelectItem>
          <SelectItem value="concluido">Concluído</SelectItem>
          <SelectItem value="pendente">Pendente</SelectItem>
          <SelectItem value="arquivado">Arquivado</SelectItem>
          <SelectItem value="cancelado">Cancelado</SelectItem>
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={(v) => onTypeChange(v as DocumentType | "all")}>
        <SelectTrigger className="w-full sm:w-[180px] h-10">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Tipos</SelectItem>
          <SelectItem value="oficio">Ofício</SelectItem>
          <SelectItem value="memorando">Memorando</SelectItem>
          <SelectItem value="portaria">Portaria</SelectItem>
          <SelectItem value="decreto">Decreto</SelectItem>
          <SelectItem value="requerimento">Requerimento</SelectItem>
          <SelectItem value="parecer">Parecer</SelectItem>
          <SelectItem value="despacho">Despacho</SelectItem>
          <SelectItem value="nota_tecnica">Nota Técnica</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
