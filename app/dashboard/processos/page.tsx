"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ProcessFilters } from "@/components/processos/process-filters"
import { ProcessTable } from "@/components/processos/process-table"
import { processos } from "@/lib/data"
import type { ProcessStatus, DocumentType } from "@/lib/types"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

export default function ProcessosPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<ProcessStatus | "all">("all")
  const [typeFilter, setTypeFilter] = useState<DocumentType | "all">("all")

  const filtered = useMemo(() => {
    return processos.filter((p) => {
      const matchSearch =
        search === "" ||
        p.numero.toLowerCase().includes(search.toLowerCase()) ||
        p.assunto.toLowerCase().includes(search.toLowerCase()) ||
        p.interessado.toLowerCase().includes(search.toLowerCase())

      const matchStatus = statusFilter === "all" || p.status === statusFilter
      const matchType = typeFilter === "all" || p.tipo === typeFilter

      return matchSearch && matchStatus && matchType
    })
  }, [search, statusFilter, typeFilter])

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Processos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Processos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Consulte e acompanhe todos os processos registrados
          </p>
        </div>
        <Badge variant="secondary" className="text-sm font-semibold px-3 py-1.5">
          {filtered.length} {filtered.length === 1 ? "processo" : "processos"}
        </Badge>
      </div>

      {/* Filters */}
      <ProcessFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
      />

      {/* Table */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-0">
          <ProcessTable processos={filtered} />
        </CardContent>
      </Card>
    </div>
  )
}
