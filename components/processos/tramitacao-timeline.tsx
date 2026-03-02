import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Send, RotateCcw, Clock } from "lucide-react"
import type { Tramitacao } from "@/lib/types"
import { formatDateTime } from "@/lib/format"

interface TramitacaoTimelineProps {
  tramitacoes: Tramitacao[]
}

function getStatusIcon(status: string) {
  switch (status) {
    case "recebido":
      return <CheckCircle2 className="h-4 w-4 text-success" />
    case "enviado":
      return <Send className="h-4 w-4 text-info" />
    case "devolvido":
      return <RotateCcw className="h-4 w-4 text-warning" />
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "recebido":
      return "bg-success/10 text-success border-success/20"
    case "enviado":
      return "bg-info/10 text-info border-info/20"
    case "devolvido":
      return "bg-warning/10 text-warning-foreground border-warning/20"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export function TramitacaoTimeline({ tramitacoes }: TramitacaoTimelineProps) {
  if (tramitacoes.length === 0) {
    return (
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-card-foreground">Tramitação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhuma tramitação registrada para este processo.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Histórico de Tramitação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-3 bottom-3 w-px bg-border" />

          <div className="flex flex-col gap-0">
            {tramitacoes.map((tram, index) => (
              <div key={tram.id} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Timeline dot */}
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card border-2 border-border">
                  {getStatusIcon(tram.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Badge variant="secondary" className="text-[11px] font-bold">
                      {tram.setorOrigemSigla}
                    </Badge>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <Badge variant="secondary" className="text-[11px] font-bold">
                      {tram.setorDestinoSigla}
                    </Badge>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ml-auto ${getStatusBadge(tram.status)}`}>
                      {tram.status === "recebido" ? "Recebido" : tram.status === "enviado" ? "Enviado" : "Devolvido"}
                    </Badge>
                  </div>

                  {tram.despacho && (
                    <p className="text-sm text-card-foreground leading-relaxed bg-muted/40 rounded-lg p-3 border border-border mb-2">
                      {tram.despacho}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span>Enviado: {formatDateTime(tram.dataEnvio)}</span>
                    {tram.dataRecebimento && (
                      <span>Recebido: {formatDateTime(tram.dataRecebimento)}</span>
                    )}
                    <span className="ml-auto font-medium">{tram.responsavel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
