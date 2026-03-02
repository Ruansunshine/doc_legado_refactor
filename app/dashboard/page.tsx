import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentProcesses } from "@/components/dashboard/recent-processes"
import { RecentTramitacoes } from "@/components/dashboard/recent-tramitacoes"
import { getDashboardStats, currentUser } from "@/lib/data"
import { Building2 } from "lucide-react"

export default function DashboardPage() {
  const stats = getDashboardStats()

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Painel de Controle
        </h1>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" />
          {currentUser.secretariaNome}
        </p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RecentProcesses processos={stats.processosRecentes} />
        </div>
        <div className="lg:col-span-2">
          <RecentTramitacoes tramitacoes={stats.tramitacoesRecentes} />
        </div>
      </div>
    </div>
  )
}
