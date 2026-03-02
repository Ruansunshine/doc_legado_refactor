import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Lock, Globe } from "lucide-react"
import type { NotaInterna } from "@/lib/types"
import { formatDateTime } from "@/lib/format"

interface NotesListProps {
  notas: NotaInterna[]
}

export function NotesList({ notas }: NotesListProps) {
  if (notas.length === 0) {
    return (
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-card-foreground">Notas Internas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhuma nota registrada.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          Notas Internas ({notas.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {notas.map((nota) => (
            <div key={nota.id} className="px-6 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-card-foreground">{nota.autor}</span>
                {nota.privada ? (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-warning/10 text-warning-foreground border-warning/20">
                    <Lock className="h-2.5 w-2.5 mr-1" />
                    Privada
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-success/10 text-success border-success/20">
                    <Globe className="h-2.5 w-2.5 mr-1" />
                    Pública
                  </Badge>
                )}
                <span className="text-[10px] text-muted-foreground ml-auto">{formatDateTime(nota.dataCriacao)}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{nota.conteudo}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
