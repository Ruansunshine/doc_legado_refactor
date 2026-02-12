import { notFound } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProcessHeader } from "@/components/processos/process-header"
import { TramitacaoTimeline } from "@/components/processos/tramitacao-timeline"
import { DocumentsList } from "@/components/processos/documents-list"
import { NotesList } from "@/components/processos/notes-list"
import { ExportButton } from "@/components/processos/export-button"
import { getProcessoById, getDocumentosByProcesso, getTramitacoesByProcesso, getNotasByProcesso } from "@/lib/data"
import { FileText, Clock, MessageSquare } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProcessoDetailPage({ params }: PageProps) {
  const { id } = await params
  const processo = getProcessoById(id)

  if (!processo) {
    notFound()
  }

  const documentos = getDocumentosByProcesso(id)
  const tramitacoes = getTramitacoesByProcesso(id)
  const notas = getNotasByProcesso(id)

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      {/* Breadcrumb + Export */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Painel</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/processos">Processos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{processo.numero}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ExportButton processoId={processo.id} processoNumero={processo.numero} />
      </div>

      {/* Process Header */}
      <ProcessHeader processo={processo} />

      {/* Tabs */}
      <Tabs defaultValue="documentos" className="w-full">
        <TabsList className="bg-muted/50 border border-border w-full justify-start h-10 rounded-lg p-1">
          <TabsTrigger
            value="documentos"
            className="text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-sm rounded-md gap-1.5"
          >
            <FileText className="h-3.5 w-3.5" />
            Documentos
            {documentos.length > 0 && (
              <span className="ml-1 text-[10px] bg-primary/10 text-primary rounded-full px-1.5 py-0 font-bold">
                {documentos.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="tramitacao"
            className="text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-sm rounded-md gap-1.5"
          >
            <Clock className="h-3.5 w-3.5" />
            Tramitacao
            {tramitacoes.length > 0 && (
              <span className="ml-1 text-[10px] bg-accent/10 text-accent rounded-full px-1.5 py-0 font-bold">
                {tramitacoes.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="notas"
            className="text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-sm rounded-md gap-1.5"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Notas
            {notas.length > 0 && (
              <span className="ml-1 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0 font-bold">
                {notas.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentos" className="mt-4">
          <DocumentsList documentos={documentos} />
        </TabsContent>

        <TabsContent value="tramitacao" className="mt-4">
          <TramitacaoTimeline tramitacoes={tramitacoes} />
        </TabsContent>

        <TabsContent value="notas" className="mt-4">
          <NotesList notas={notas} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
