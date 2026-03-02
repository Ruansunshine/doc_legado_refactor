import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Building2, FileText, Clock } from "lucide-react"
import type { Processo } from "@/lib/types"
import { formatDate, formatRelativeDate, getStatusLabel, getStatusColor, getDocTypeLabel, getDocTypeColor } from "@/lib/format"

interface ProcessHeaderProps {
  processo: Processo
}

export function ProcessHeader({ processo }: ProcessHeaderProps) {
  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-xl font-bold text-card-foreground font-mono">{processo.numero}</h1>
              <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getStatusColor(processo.status)}`}>
                {getStatusLabel(processo.status)}
              </Badge>
              <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getDocTypeColor(processo.tipo)}`}>
                {getDocTypeLabel(processo.tipo)}
              </Badge>
            </div>
            <h2 className="text-base text-card-foreground font-medium mb-4">{processo.assunto}</h2>
            {processo.observacao && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 bg-muted/50 rounded-lg p-3 border border-border">
                {processo.observacao}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 pt-4 border-t border-border">
          <InfoItem icon={<Building2 className="h-3.5 w-3.5" />} label="Origem" value={processo.secretariaOrigemSigla} />
          <InfoItem icon={<User className="h-3.5 w-3.5" />} label="Interessado" value={processo.interessado} />
          <InfoItem icon={<Calendar className="h-3.5 w-3.5" />} label="Criado em" value={formatDate(processo.dataCriacao)} />
          <InfoItem icon={<Clock className="h-3.5 w-3.5" />} label="Atualizado" value={formatRelativeDate(processo.dataAtualizacao)} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-card-foreground">{processo.totalDocumentos}</p>
              <p className="text-[11px] text-muted-foreground">Documentos</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-card-foreground">{processo.totalTramitacoes}</p>
              <p className="text-[11px] text-muted-foreground">Tramitações</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-card-foreground truncate">{value}</p>
      </div>
    </div>
  )
}
