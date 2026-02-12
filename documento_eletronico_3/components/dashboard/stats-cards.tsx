import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import type { DashboardStats } from "@/lib/types"

interface StatsCardsProps {
  stats: DashboardStats
}

const statItems = [
  { key: "totalProcessos" as const, label: "Total de Processos", icon: FileText, color: "text-primary bg-primary/10" },
  { key: "emAndamento" as const, label: "Em Andamento", icon: Clock, color: "text-info bg-info/10" },
  { key: "concluidos" as const, label: "Concluídos", icon: CheckCircle2, color: "text-success bg-success/10" },
  { key: "pendentes" as const, label: "Pendentes", icon: AlertCircle, color: "text-warning bg-warning/10" },
]

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.key} className="border border-border shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-card-foreground">{stats[item.key]}</p>
              <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
