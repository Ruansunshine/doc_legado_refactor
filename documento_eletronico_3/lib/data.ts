// ============================================================
// Mock Data Layer - Simulates the Conecta São Luís database
// ============================================================

import type {
  User,
  Secretaria,
  Processo,
  Documento,
  Tramitacao,
  Assinatura,
  Anexo,
  NotaInterna,
  DashboardStats,
  ProcessoResumo,
} from "./types"

// Secretarias
export const secretarias: Secretaria[] = [
  { id: "sec-1", nome: "Secretaria Municipal de Administração", sigla: "SEMAD", responsavel: "Carlos Mendes" },
  { id: "sec-2", nome: "Secretaria Municipal de Educação", sigla: "SEMED", responsavel: "Ana Paula Silva" },
  { id: "sec-3", nome: "Secretaria Municipal de Saúde", sigla: "SEMUS", responsavel: "Dr. Roberto Lima" },
  { id: "sec-4", nome: "Secretaria Municipal de Infraestrutura", sigla: "SEMINFRA", responsavel: "Eng. Marcos Oliveira" },
  { id: "sec-5", nome: "Secretaria Municipal de Finanças", sigla: "SEMFIN", responsavel: "Dra. Lucia Costa" },
]

// Current User
export const currentUser: User = {
  id: "user-1",
  name: "Maria Fernanda Alves",
  email: "maria.alves@saoluis.ma.gov.br",
  role: "gestor",
  secretariaId: "sec-1",
  secretariaNome: "Secretaria Municipal de Administração",
  avatar: undefined,
}

// Processos
export const processos: Processo[] = [
  {
    id: "proc-1",
    numero: "2026.001.00234",
    tipo: "oficio",
    assunto: "Solicitação de Recursos para Manutenção Predial",
    status: "em_andamento",
    dataCriacao: "2026-01-15T10:30:00Z",
    dataAtualizacao: "2026-02-08T14:20:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administração",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-1",
    criadorNome: "Maria Fernanda Alves",
    interessado: "Diretoria de Patrimônio",
    observacao: "Solicitação urgente para manutenção do prédio sede.",
    totalDocumentos: 4,
    totalTramitacoes: 3,
  },
  {
    id: "proc-2",
    numero: "2026.001.00198",
    tipo: "memorando",
    assunto: "Alteração de Horário de Expediente - Carnaval 2026",
    status: "concluido",
    dataCriacao: "2026-01-10T09:00:00Z",
    dataAtualizacao: "2026-01-28T16:45:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administração",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-1",
    criadorNome: "Maria Fernanda Alves",
    interessado: "Todas as Secretarias",
    totalDocumentos: 2,
    totalTramitacoes: 5,
  },
  {
    id: "proc-3",
    numero: "2026.002.00412",
    tipo: "requerimento",
    assunto: "Contratação de Professores Temporários",
    status: "pendente",
    dataCriacao: "2026-02-01T11:15:00Z",
    dataAtualizacao: "2026-02-09T10:00:00Z",
    secretariaOrigemId: "sec-2",
    secretariaOrigemNome: "Secretaria Municipal de Educação",
    secretariaOrigemSigla: "SEMED",
    criadorId: "user-3",
    criadorNome: "Pedro Henrique Santos",
    interessado: "Coord. de Ensino Fundamental",
    totalDocumentos: 6,
    totalTramitacoes: 2,
  },
  {
    id: "proc-4",
    numero: "2026.003.00089",
    tipo: "parecer",
    assunto: "Aquisição de Equipamentos Hospitalares",
    status: "em_andamento",
    dataCriacao: "2026-01-20T08:45:00Z",
    dataAtualizacao: "2026-02-07T11:30:00Z",
    secretariaOrigemId: "sec-3",
    secretariaOrigemNome: "Secretaria Municipal de Saúde",
    secretariaOrigemSigla: "SEMUS",
    criadorId: "user-4",
    criadorNome: "Juliana Marques",
    interessado: "Hospital Municipal",
    totalDocumentos: 8,
    totalTramitacoes: 4,
  },
  {
    id: "proc-5",
    numero: "2026.004.00156",
    tipo: "portaria",
    assunto: "Nomeação de Comissão de Licitação",
    status: "concluido",
    dataCriacao: "2026-01-05T14:00:00Z",
    dataAtualizacao: "2026-01-18T17:00:00Z",
    secretariaOrigemId: "sec-4",
    secretariaOrigemNome: "Secretaria Municipal de Infraestrutura",
    secretariaOrigemSigla: "SEMINFRA",
    criadorId: "user-5",
    criadorNome: "Ricardo Gomes",
    interessado: "Departamento de Compras",
    totalDocumentos: 3,
    totalTramitacoes: 6,
  },
  {
    id: "proc-6",
    numero: "2026.005.00321",
    tipo: "nota_tecnica",
    assunto: "Análise de Impacto Orçamentário - Reajuste Salarial",
    status: "em_andamento",
    dataCriacao: "2026-02-03T10:00:00Z",
    dataAtualizacao: "2026-02-10T09:15:00Z",
    secretariaOrigemId: "sec-5",
    secretariaOrigemNome: "Secretaria Municipal de Finanças",
    secretariaOrigemSigla: "SEMFIN",
    criadorId: "user-6",
    criadorNome: "Fernanda Costa",
    interessado: "Gabinete do Prefeito",
    totalDocumentos: 5,
    totalTramitacoes: 3,
  },
  {
    id: "proc-7",
    numero: "2026.001.00267",
    tipo: "despacho",
    assunto: "Aprovação de Férias Coletivas - Dezembro 2026",
    status: "arquivado",
    dataCriacao: "2025-11-10T13:00:00Z",
    dataAtualizacao: "2025-12-20T16:30:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administração",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-1",
    criadorNome: "Maria Fernanda Alves",
    interessado: "Recursos Humanos",
    totalDocumentos: 2,
    totalTramitacoes: 4,
  },
  {
    id: "proc-8",
    numero: "2026.001.00290",
    tipo: "decreto",
    assunto: "Regulamentação do Teletrabalho no Serviço Público",
    status: "pendente",
    dataCriacao: "2026-02-05T09:30:00Z",
    dataAtualizacao: "2026-02-11T08:00:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administração",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-2",
    criadorNome: "João Carlos Ribeiro",
    interessado: "Todas as Secretarias",
    totalDocumentos: 7,
    totalTramitacoes: 1,
  },
]

// Documentos (for proc-1)
export const documentosProc1: Documento[] = [
  {
    id: "doc-1",
    processoId: "proc-1",
    titulo: "Ofício n. 234/2026 - Solicitação de Recursos",
    tipo: "oficio",
    conteudo: "Senhor Secretário,\n\nVenho, por meio deste ofício, solicitar a alocação de recursos financeiros no montante de R$ 150.000,00 (cento e cinquenta mil reais) para a realização de serviços de manutenção predial nas dependências da sede desta Secretaria.\n\nAs instalações apresentam necessidade urgente de reparos na parte elétrica, hidráulica e na cobertura do edifício, conforme laudo técnico anexo.\n\nSolicito a análise e providências cabíveis.\n\nAtenciosamente,\nMaria Fernanda Alves\nDiretora de Administração",
    dataCriacao: "2026-01-15T10:30:00Z",
    criadoPor: "Maria Fernanda Alves",
    assinaturas: [
      { id: "sig-1", documentoId: "doc-1", signatario: "Maria Fernanda Alves", cargo: "Diretora de Administração", dataAssinatura: "2026-01-15T10:35:00Z", tipo: "digital", valida: true },
      { id: "sig-2", documentoId: "doc-1", signatario: "Carlos Mendes", cargo: "Secretário Municipal de Administração", dataAssinatura: "2026-01-15T14:00:00Z", tipo: "digital", valida: true },
    ],
    anexos: [
      { id: "anx-1", documentoId: "doc-1", nome: "Laudo_Tecnico_Manutencao.pdf", tipo: "application/pdf", tamanho: "2.4 MB", dataUpload: "2026-01-15T10:28:00Z" },
      { id: "anx-2", documentoId: "doc-1", nome: "Fotos_Instalacoes.zip", tipo: "application/zip", tamanho: "15.7 MB", dataUpload: "2026-01-15T10:29:00Z" },
    ],
  },
  {
    id: "doc-2",
    processoId: "proc-1",
    titulo: "Parecer Técnico n. 045/2026",
    tipo: "parecer",
    conteudo: "Parecer referente à solicitação de recursos para manutenção predial.\n\nApós vistoria realizada in loco, confirma-se a necessidade dos reparos solicitados. O orçamento apresentado está compatível com os valores praticados no mercado.\n\nParecer favorável à aprovação dos recursos solicitados.",
    dataCriacao: "2026-01-22T15:00:00Z",
    criadoPor: "Eng. Paulo Roberto",
    assinaturas: [
      { id: "sig-3", documentoId: "doc-2", signatario: "Eng. Paulo Roberto", cargo: "Engenheiro Civil - SEMINFRA", dataAssinatura: "2026-01-22T15:10:00Z", tipo: "digital", valida: true },
    ],
    anexos: [
      { id: "anx-3", documentoId: "doc-2", nome: "Planilha_Orcamento.xlsx", tipo: "application/xlsx", tamanho: "485 KB", dataUpload: "2026-01-22T15:05:00Z" },
    ],
  },
  {
    id: "doc-3",
    processoId: "proc-1",
    titulo: "Despacho n. 112/2026 - Aprovação Parcial",
    tipo: "despacho",
    conteudo: "Aprovo parcialmente a solicitação, autorizando a liberação de R$ 100.000,00 para início imediato dos serviços mais urgentes (parte elétrica e hidráulica).\n\nA análise do restante dos recursos ficará condicionada à disponibilidade orçamentária do próximo trimestre.",
    dataCriacao: "2026-02-01T11:00:00Z",
    criadoPor: "Dra. Lucia Costa",
    assinaturas: [
      { id: "sig-4", documentoId: "doc-3", signatario: "Dra. Lucia Costa", cargo: "Secretária Municipal de Finanças", dataAssinatura: "2026-02-01T11:15:00Z", tipo: "digital", valida: true },
    ],
    anexos: [],
  },
  {
    id: "doc-4",
    processoId: "proc-1",
    titulo: "Memorando n. 078/2026 - Ciência e Providências",
    tipo: "memorando",
    conteudo: "Para conhecimento e providências cabíveis quanto ao início dos serviços de manutenção predial aprovados.",
    dataCriacao: "2026-02-05T09:00:00Z",
    criadoPor: "Maria Fernanda Alves",
    assinaturas: [
      { id: "sig-5", documentoId: "doc-4", signatario: "Maria Fernanda Alves", cargo: "Diretora de Administração", dataAssinatura: "2026-02-05T09:10:00Z", tipo: "digital", valida: true },
    ],
    anexos: [],
  },
]

// Tramitações (for proc-1)
export const tramitacoesProc1: Tramitacao[] = [
  {
    id: "tram-1",
    processoId: "proc-1",
    setorOrigemNome: "Secretaria Municipal de Administração",
    setorOrigemSigla: "SEMAD",
    setorDestinoNome: "Secretaria Municipal de Infraestrutura",
    setorDestinoSigla: "SEMINFRA",
    dataEnvio: "2026-01-16T08:00:00Z",
    dataRecebimento: "2026-01-16T10:30:00Z",
    despacho: "Encaminho para parecer técnico sobre viabilidade e orçamento.",
    responsavel: "Maria Fernanda Alves",
    status: "recebido",
  },
  {
    id: "tram-2",
    processoId: "proc-1",
    setorOrigemNome: "Secretaria Municipal de Infraestrutura",
    setorOrigemSigla: "SEMINFRA",
    setorDestinoNome: "Secretaria Municipal de Finanças",
    setorDestinoSigla: "SEMFIN",
    dataEnvio: "2026-01-23T09:00:00Z",
    dataRecebimento: "2026-01-23T14:00:00Z",
    despacho: "Parecer favorável emitido. Encaminho para análise financeira.",
    responsavel: "Eng. Paulo Roberto",
    status: "recebido",
  },
  {
    id: "tram-3",
    processoId: "proc-1",
    setorOrigemNome: "Secretaria Municipal de Finanças",
    setorOrigemSigla: "SEMFIN",
    setorDestinoNome: "Secretaria Municipal de Administração",
    setorDestinoSigla: "SEMAD",
    dataEnvio: "2026-02-01T14:00:00Z",
    dataRecebimento: "2026-02-01T16:00:00Z",
    despacho: "Aprovação parcial concedida. Recursos liberados conforme despacho.",
    responsavel: "Dra. Lucia Costa",
    status: "recebido",
  },
]

// Notas Internas
export const notasProc1: NotaInterna[] = [
  {
    id: "nota-1",
    processoId: "proc-1",
    autor: "Maria Fernanda Alves",
    conteudo: "Verificar com o departamento de compras se já existe ata de registro de preços para serviços de manutenção predial.",
    dataCriacao: "2026-01-15T11:00:00Z",
    privada: false,
  },
  {
    id: "nota-2",
    processoId: "proc-1",
    autor: "Carlos Mendes",
    conteudo: "Priorizar a manutenção elétrica. Houve relato de curto-circuito no 3o andar na semana passada.",
    dataCriacao: "2026-01-17T09:30:00Z",
    privada: true,
  },
  {
    id: "nota-3",
    processoId: "proc-1",
    autor: "Maria Fernanda Alves",
    conteudo: "Recursos parciais liberados. Iniciar processo de contratação dos serviços urgentes.",
    dataCriacao: "2026-02-02T10:00:00Z",
    privada: false,
  },
]

// Helper functions
export function getProcessoById(id: string): Processo | undefined {
  return processos.find((p) => p.id === id)
}

export function getDocumentosByProcesso(processoId: string): Documento[] {
  if (processoId === "proc-1") return documentosProc1
  return []
}

export function getTramitacoesByProcesso(processoId: string): Tramitacao[] {
  if (processoId === "proc-1") return tramitacoesProc1
  return []
}

export function getNotasByProcesso(processoId: string): NotaInterna[] {
  if (processoId === "proc-1") return notasProc1
  return []
}

export function getDashboardStats(): DashboardStats {
  return {
    totalProcessos: processos.length,
    emAndamento: processos.filter((p) => p.status === "em_andamento").length,
    concluidos: processos.filter((p) => p.status === "concluido").length,
    pendentes: processos.filter((p) => p.status === "pendente").length,
    processosRecentes: processos.slice(0, 5).map(toResumo),
    tramitacoesRecentes: tramitacoesProc1.slice(0, 3),
  }
}

function toResumo(p: Processo): ProcessoResumo {
  return {
    id: p.id,
    numero: p.numero,
    tipo: p.tipo,
    assunto: p.assunto,
    status: p.status,
    dataCriacao: p.dataCriacao,
    secretariaOrigemSigla: p.secretariaOrigemSigla,
    interessado: p.interessado,
    totalDocumentos: p.totalDocumentos,
    totalTramitacoes: p.totalTramitacoes,
  }
}
