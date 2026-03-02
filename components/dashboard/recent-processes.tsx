import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import type { ProcessoResumo } from "@/lib/types"
import { formatDate, getStatusLabel, getStatusColor, getDocTypeLabel } from "@/lib/format"

interface RecentProcessesProps {
  processos: ProcessoResumo[]
}

export function RecentProcesses({ processos }: RecentProcessesProps) {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold text-card-foreground">Processos Recentes</CardTitle>
        <Link href="/dashboard/processos">
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80">
            Ver todos <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {processos.map((processo) => (
            <Link
              key={processo.id}
              href={`/dashboard/processos/${processo.id}`}
              className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/50 transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-card-foreground truncate">{processo.numero}</p>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusColor(processo.status)}`}>
                    {getStatusLabel(processo.status)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{processo.assunto}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end shrink-0">
                <Badge variant="secondary" className="text-[10px] font-medium mb-0.5">
                  {getDocTypeLabel(processo.tipo)}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{formatDate(processo.dataCriacao)}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
