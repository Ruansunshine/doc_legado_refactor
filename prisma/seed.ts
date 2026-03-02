// ============================================================
// Database Seed - Popula o banco com dados iniciais
// Execute: npx prisma db seed
// ============================================================

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando seed do banco de dados...")

  // Limpar dados existentes
  await prisma.notaInterna.deleteMany()
  await prisma.tramitacao.deleteMany()
  await prisma.assinatura.deleteMany()
  await prisma.anexo.deleteMany()
  await prisma.documento.deleteMany()
  await prisma.session.deleteMany()
  await prisma.processo.deleteMany()
  await prisma.user.deleteMany()
  await prisma.secretaria.deleteMany()

  console.log("Dados existentes limpos.")

  // Secretarias
  const semad = await prisma.secretaria.create({
    data: { nome: "Secretaria Municipal de Administracao", sigla: "SEMAD", responsavel: "Carlos Mendes" },
  })
  const semed = await prisma.secretaria.create({
    data: { nome: "Secretaria Municipal de Educacao", sigla: "SEMED", responsavel: "Ana Paula Silva" },
  })
  const semus = await prisma.secretaria.create({
    data: { nome: "Secretaria Municipal de Saude", sigla: "SEMUS", responsavel: "Dr. Roberto Lima" },
  })
  const seminfra = await prisma.secretaria.create({
    data: { nome: "Secretaria Municipal de Infraestrutura", sigla: "SEMINFRA", responsavel: "Eng. Marcos Oliveira" },
  })
  const semfin = await prisma.secretaria.create({
    data: { nome: "Secretaria Municipal de Financas", sigla: "SEMFIN", responsavel: "Dra. Lucia Costa" },
  })

  console.log("Secretarias criadas.")

  // Users
  const passwordHash = await bcrypt.hash("admin123", 12)

  const maria = await prisma.user.create({
    data: {
      name: "Maria Fernanda Alves",
      email: "maria.alves@saoluis.ma.gov.br",
      passwordHash,
      role: "GESTOR",
      secretariaId: semad.id,
    },
  })
  const joao = await prisma.user.create({
    data: {
      name: "Joao Carlos Ribeiro",
      email: "joao.ribeiro@saoluis.ma.gov.br",
      passwordHash,
      role: "SERVIDOR",
      secretariaId: semad.id,
    },
  })
  const pedro = await prisma.user.create({
    data: {
      name: "Pedro Henrique Santos",
      email: "pedro.santos@saoluis.ma.gov.br",
      passwordHash,
      role: "SERVIDOR",
      secretariaId: semed.id,
    },
  })
  const juliana = await prisma.user.create({
    data: {
      name: "Juliana Marques",
      email: "juliana.marques@saoluis.ma.gov.br",
      passwordHash,
      role: "GESTOR",
      secretariaId: semus.id,
    },
  })
  const ricardo = await prisma.user.create({
    data: {
      name: "Ricardo Gomes",
      email: "ricardo.gomes@saoluis.ma.gov.br",
      passwordHash,
      role: "SERVIDOR",
      secretariaId: seminfra.id,
    },
  })
  const fernanda = await prisma.user.create({
    data: {
      name: "Fernanda Costa",
      email: "fernanda.costa@saoluis.ma.gov.br",
      passwordHash,
      role: "GESTOR",
      secretariaId: semfin.id,
    },
  })
  const admin = await prisma.user.create({
    data: {
      name: "Administrador do Sistema",
      email: "admin@saoluis.ma.gov.br",
      passwordHash: await bcrypt.hash("admin", 12),
      role: "ADMIN",
      secretariaId: semad.id,
    },
  })

  console.log("Usuarios criados. Senha padrao: admin123 (admin: admin)")

  // Processos
  const proc1 = await prisma.processo.create({
    data: {
      numero: "2026.001.00234",
      tipo: "OFICIO",
      assunto: "Solicitacao de Recursos para Manutencao Predial",
      status: "EM_ANDAMENTO",
      interessado: "Diretoria de Patrimonio",
      observacao: "Solicitacao urgente para manutencao do predio sede.",
      secretariaOrigemId: semad.id,
      criadorId: maria.id,
    },
  })
  const proc2 = await prisma.processo.create({
    data: {
      numero: "2026.001.00198",
      tipo: "MEMORANDO",
      assunto: "Alteracao de Horario de Expediente - Carnaval 2026",
      status: "CONCLUIDO",
      interessado: "Todas as Secretarias",
      secretariaOrigemId: semad.id,
      criadorId: maria.id,
    },
  })
  const proc3 = await prisma.processo.create({
    data: {
      numero: "2026.002.00412",
      tipo: "REQUERIMENTO",
      assunto: "Contratacao de Professores Temporarios",
      status: "PENDENTE",
      interessado: "Coord. de Ensino Fundamental",
      secretariaOrigemId: semed.id,
      criadorId: pedro.id,
    },
  })
  const proc4 = await prisma.processo.create({
    data: {
      numero: "2026.003.00089",
      tipo: "PARECER",
      assunto: "Aquisicao de Equipamentos Hospitalares",
      status: "EM_ANDAMENTO",
      interessado: "Hospital Municipal",
      secretariaOrigemId: semus.id,
      criadorId: juliana.id,
    },
  })
  const proc5 = await prisma.processo.create({
    data: {
      numero: "2026.004.00156",
      tipo: "PORTARIA",
      assunto: "Nomeacao de Comissao de Licitacao",
      status: "CONCLUIDO",
      interessado: "Departamento de Compras",
      secretariaOrigemId: seminfra.id,
      criadorId: ricardo.id,
    },
  })
  const proc6 = await prisma.processo.create({
    data: {
      numero: "2026.005.00321",
      tipo: "NOTA_TECNICA",
      assunto: "Analise de Impacto Orcamentario - Reajuste Salarial",
      status: "EM_ANDAMENTO",
      interessado: "Gabinete do Prefeito",
      secretariaOrigemId: semfin.id,
      criadorId: fernanda.id,
    },
  })
  const proc7 = await prisma.processo.create({
    data: {
      numero: "2026.001.00267",
      tipo: "DESPACHO",
      assunto: "Aprovacao de Ferias Coletivas - Dezembro 2026",
      status: "ARQUIVADO",
      interessado: "Recursos Humanos",
      secretariaOrigemId: semad.id,
      criadorId: maria.id,
    },
  })
  const proc8 = await prisma.processo.create({
    data: {
      numero: "2026.001.00290",
      tipo: "DECRETO",
      assunto: "Regulamentacao do Teletrabalho no Servico Publico",
      status: "PENDENTE",
      interessado: "Todas as Secretarias",
      secretariaOrigemId: semad.id,
      criadorId: joao.id,
    },
  })

  console.log("8 processos criados.")

  // Documentos para proc1
  const doc1 = await prisma.documento.create({
    data: {
      titulo: "Oficio n. 234/2026 - Solicitacao de Recursos",
      tipo: "OFICIO",
      conteudo: "Senhor Secretario,\n\nVenho, por meio deste oficio, solicitar a alocacao de recursos financeiros no montante de R$ 150.000,00 para a realizacao de servicos de manutencao predial nas dependencias da sede desta Secretaria.\n\nAs instalacoes apresentam necessidade urgente de reparos na parte eletrica, hidraulica e na cobertura do edificio, conforme laudo tecnico anexo.\n\nAtenciosamente,\nMaria Fernanda Alves\nDiretora de Administracao",
      processoId: proc1.id,
      criadoPorId: maria.id,
    },
  })
  const doc2 = await prisma.documento.create({
    data: {
      titulo: "Parecer Tecnico n. 045/2026",
      tipo: "PARECER",
      conteudo: "Parecer referente a solicitacao de recursos para manutencao predial.\n\nApos vistoria realizada in loco, confirma-se a necessidade dos reparos solicitados. O orcamento apresentado esta compativel com os valores praticados no mercado.\n\nParecer favoravel a aprovacao dos recursos solicitados.",
      processoId: proc1.id,
      criadoPorId: ricardo.id,
    },
  })
  const doc3 = await prisma.documento.create({
    data: {
      titulo: "Despacho n. 112/2026 - Aprovacao Parcial",
      tipo: "DESPACHO",
      conteudo: "Aprovo parcialmente a solicitacao, autorizando a liberacao de R$ 100.000,00 para inicio imediato dos servicos mais urgentes (parte eletrica e hidraulica).\n\nA analise do restante dos recursos ficara condicionada a disponibilidade orcamentaria do proximo trimestre.",
      processoId: proc1.id,
      criadoPorId: fernanda.id,
    },
  })
  const doc4 = await prisma.documento.create({
    data: {
      titulo: "Memorando n. 078/2026 - Ciencia e Providencias",
      tipo: "MEMORANDO",
      conteudo: "Para conhecimento e providencias cabiveis quanto ao inicio dos servicos de manutencao predial aprovados.",
      processoId: proc1.id,
      criadoPorId: maria.id,
    },
  })

  // Assinaturas
  await prisma.assinatura.createMany({
    data: [
      { signatario: "Maria Fernanda Alves", cargo: "Diretora de Administracao", tipo: "DIGITAL", valida: true, dataAssinatura: new Date("2026-01-15T10:35:00Z"), documentoId: doc1.id },
      { signatario: "Carlos Mendes", cargo: "Secretario Municipal de Administracao", tipo: "DIGITAL", valida: true, dataAssinatura: new Date("2026-01-15T14:00:00Z"), documentoId: doc1.id },
      { signatario: "Eng. Paulo Roberto", cargo: "Engenheiro Civil - SEMINFRA", tipo: "DIGITAL", valida: true, dataAssinatura: new Date("2026-01-22T15:10:00Z"), documentoId: doc2.id },
      { signatario: "Dra. Lucia Costa", cargo: "Secretaria Municipal de Financas", tipo: "DIGITAL", valida: true, dataAssinatura: new Date("2026-02-01T11:15:00Z"), documentoId: doc3.id },
      { signatario: "Maria Fernanda Alves", cargo: "Diretora de Administracao", tipo: "DIGITAL", valida: true, dataAssinatura: new Date("2026-02-05T09:10:00Z"), documentoId: doc4.id },
    ],
  })

  // Anexos
  await prisma.anexo.createMany({
    data: [
      { nome: "Laudo_Tecnico_Manutencao.pdf", tipo: "application/pdf", tamanho: "2.4 MB", documentoId: doc1.id },
      { nome: "Fotos_Instalacoes.zip", tipo: "application/zip", tamanho: "15.7 MB", documentoId: doc1.id },
      { nome: "Planilha_Orcamento.xlsx", tipo: "application/xlsx", tamanho: "485 KB", documentoId: doc2.id },
    ],
  })

  // Tramitacoes
  await prisma.tramitacao.createMany({
    data: [
      {
        processoId: proc1.id,
        setorOrigemId: semad.id,
        setorDestinoId: seminfra.id,
        dataEnvio: new Date("2026-01-16T08:00:00Z"),
        dataRecebimento: new Date("2026-01-16T10:30:00Z"),
        despacho: "Encaminho para parecer tecnico sobre viabilidade e orcamento.",
        responsavelId: maria.id,
        status: "RECEBIDO",
      },
      {
        processoId: proc1.id,
        setorOrigemId: seminfra.id,
        setorDestinoId: semfin.id,
        dataEnvio: new Date("2026-01-23T09:00:00Z"),
        dataRecebimento: new Date("2026-01-23T14:00:00Z"),
        despacho: "Parecer favoravel emitido. Encaminho para analise financeira.",
        responsavelId: ricardo.id,
        status: "RECEBIDO",
      },
      {
        processoId: proc1.id,
        setorOrigemId: semfin.id,
        setorDestinoId: semad.id,
        dataEnvio: new Date("2026-02-01T14:00:00Z"),
        dataRecebimento: new Date("2026-02-01T16:00:00Z"),
        despacho: "Aprovacao parcial concedida. Recursos liberados conforme despacho.",
        responsavelId: fernanda.id,
        status: "RECEBIDO",
      },
    ],
  })

  // Notas internas
  await prisma.notaInterna.createMany({
    data: [
      { processoId: proc1.id, autorId: maria.id, conteudo: "Verificar com o departamento de compras se ja existe ata de registro de precos para servicos de manutencao predial.", privada: false },
      { processoId: proc1.id, autorId: maria.id, conteudo: "Priorizar a manutencao eletrica. Houve relato de curto-circuito no 3o andar na semana passada.", privada: true },
      { processoId: proc1.id, autorId: maria.id, conteudo: "Recursos parciais liberados. Iniciar processo de contratacao dos servicos urgentes.", privada: false },
    ],
  })

  console.log("Documentos, assinaturas, anexos, tramitacoes e notas criados.")
  console.log("")
  console.log("=== SEED CONCLUIDO ===")
  console.log("")
  console.log("Usuarios disponiveis para login:")
  console.log("  admin@saoluis.ma.gov.br / admin (ADMIN)")
  console.log("  maria.alves@saoluis.ma.gov.br / admin123 (GESTOR)")
  console.log("  joao.ribeiro@saoluis.ma.gov.br / admin123 (SERVIDOR)")
  console.log("  pedro.santos@saoluis.ma.gov.br / admin123 (SERVIDOR)")
  console.log("  juliana.marques@saoluis.ma.gov.br / admin123 (GESTOR)")
  console.log("  ricardo.gomes@saoluis.ma.gov.br / admin123 (SERVIDOR)")
  console.log("  fernanda.costa@saoluis.ma.gov.br / admin123 (GESTOR)")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
