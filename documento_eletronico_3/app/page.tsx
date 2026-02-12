import React from "react"
import { LoginForm } from "@/components/login-form"
import { FileText, Shield, Building2 } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[55%] bg-sidebar text-sidebar-foreground flex-col justify-between p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <FileText className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-primary-foreground tracking-tight">Conecta SLZ</h1>
              <p className="text-xs text-sidebar-foreground/60">Biblioteca eletrônica</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold text-sidebar-primary-foreground leading-tight text-balance">
            Visualizador de processos-Semit
            </h2>
            <p className="mt-4 text-base text-sidebar-foreground/70 leading-relaxed max-w-lg">
              Visualize processos, tramitações, documentos.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <FeatureItem
              icon={<FileText className="h-5 w-5" />}
              title="Documentos Centralizados"
              description="Acesse ofícios, memorandos, portarias e todos os tipos documentais."
            />
            <FeatureItem
              icon={<Building2 className="h-5 w-5" />}
              title="Tramitação Transparente"
              description="Acompanhe todo o seu fluxo de movimentação entre setores."
            />
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-sidebar-foreground/40">
            Prefeitura Municipal de São Luís - Maranhão
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile branding */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-3">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Conecta SLZ</h1>
            <p className="text-sm text-muted-foreground">Documento Eletrônico</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Acessar Sistema</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Entre com suas credenciais institucionais
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-sidebar-primary-foreground">{title}</p>
        <p className="text-xs text-sidebar-foreground/60 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
