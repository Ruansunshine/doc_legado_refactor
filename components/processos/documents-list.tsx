"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FileText, ChevronDown, ChevronRight, PenTool, Paperclip, Download, CheckCircle2, XCircle, ShieldCheck } from "lucide-react"
import type { Documento } from "@/lib/types"
import { formatDateTime, getDocTypeLabel, getDocTypeColor } from "@/lib/format"

interface DocumentsListProps {
  documentos: Documento[]
}

export function DocumentsList({ documentos }: DocumentsListProps) {
  const [openDoc, setOpenDoc] = useState<string | null>(documentos[0]?.id || null)

  if (documentos.length === 0) {
    return (
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-card-foreground">Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum documento vinculado a este processo.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Documentos ({documentos.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {documentos.map((doc) => (
            <Collapsible
              key={doc.id}
              open={openDoc === doc.id}
              onOpenChange={(open) => setOpenDoc(open ? doc.id : null)}
            >
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-3 w-full px-6 py-3.5 hover:bg-muted/30 transition-colors text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-card-foreground truncate">{doc.titulo}</p>
                    <p className="text-[11px] text-muted-foreground">{doc.criadoPor} - {formatDateTime(doc.dataCriacao)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getDocTypeColor(doc.tipo)}`}>
                      {getDocTypeLabel(doc.tipo)}
                    </Badge>
                    {openDoc === doc.id ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-5 pt-1 border-t border-border bg-muted/20">
                  {/* Document content */}
                  <div className="bg-card rounded-lg border border-border p-4 mb-4">
                    <p className="text-sm text-card-foreground whitespace-pre-line leading-relaxed">
                      {doc.conteudo}
                    </p>
                  </div>

                  {/* Signatures */}
                  {doc.assinaturas.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <PenTool className="h-3 w-3" />
                        Assinaturas
                      </h4>
                      <div className="flex flex-col gap-2">
                        {doc.assinaturas.map((sig) => (
                          <div key={sig.id} className="flex items-center gap-3 bg-card rounded-lg border border-border p-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full">
                              {sig.valida ? (
                                <ShieldCheck className="h-5 w-5 text-success" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-card-foreground">{sig.signatario}</p>
                              <p className="text-[11px] text-muted-foreground">{sig.cargo}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <Badge variant="outline" className="text-[10px] mb-0.5">
                                {sig.tipo === "digital" ? "Digital" : "Física"}
                              </Badge>
                              <p className="text-[10px] text-muted-foreground">{formatDateTime(sig.dataAssinatura)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  {doc.anexos.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Paperclip className="h-3 w-3" />
                        Anexos
                      </h4>
                      <div className="flex flex-col gap-2">
                        {doc.anexos.map((anexo) => (
                          <div key={anexo.id} className="flex items-center gap-3 bg-card rounded-lg border border-border p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                              <Paperclip className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-card-foreground truncate">{anexo.nome}</p>
                              <p className="text-[11px] text-muted-foreground">{anexo.tamanho} - {formatDateTime(anexo.dataUpload)}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
