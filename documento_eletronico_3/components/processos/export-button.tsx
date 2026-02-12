"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileSpreadsheet, FileText } from "lucide-react"
import { toast } from "sonner"

interface ExportButtonProps {
  processoId: string
  processoNumero: string
}

export function ExportButton({ processoId, processoNumero }: ExportButtonProps) {
  const handleExport = async (format: "csv" | "txt") => {
    try {
      const res = await fetch(`/api/processos/${processoId}/export?format=${format}`)

      if (!res.ok) {
        toast.error("Erro ao exportar processo")
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `processo_${processoNumero.replace(/\./g, "_")}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`Processo exportado como ${format.toUpperCase()}`)
    } catch {
      toast.error("Erro ao exportar. Verifique a conexao com o banco.")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="h-4 w-4 text-success" />
          Exportar CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("txt")} className="gap-2 cursor-pointer">
          <FileText className="h-4 w-4 text-primary" />
          Exportar TXT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
