import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight as ArrowRightIcon, MoveRight } from "lucide-react"
import type { Tramitacao } from "@/lib/types"
import { formatDateTime } from "@/lib/format"

interface RecentTramitacoesProps {
  tramitacoes: Tramitacao[]
}

export function RecentTramitacoes({ tramitacoes }: RecentTramitacoesProps) {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-card-foreground">Tramitações Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {tramitacoes.map((tram) => (
            <div key={tram.id} className="px-6 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-[10px] font-semibold">
                  {tram.setorOrigemSigla}
                </Badge>
                <MoveRight className="h-3.5 w-3.5 text-muted-foreground" />
                <Badge variant="secondary" className="text-[10px] font-semibold">
                  {tram.setorDestinoSigla}
                </Badge>
                <Badge
                  variant="outline"
                  className={`ml-auto text-[10px] px-1.5 py-0 ${
                    tram.status === "recebido"
                      ? "bg-success/10 text-success border-success/20"
                      : tram.status === "enviado"
                        ? "bg-info/10 text-info border-info/20"
                        : "bg-warning/10 text-warning-foreground border-warning/20"
                  }`}
                >
                  {tram.status === "recebido" ? "Recebido" : tram.status === "enviado" ? "Enviado" : "Devolvido"}
                </Badge>
              </div>
              {tram.despacho && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tram.despacho}</p>
              )}
              <p className="text-[10px] text-muted-foreground/60 mt-1.5">
                {formatDateTime(tram.dataEnvio)} - {tram.responsavel}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
