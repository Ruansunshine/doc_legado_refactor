-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SERVIDOR', 'GESTOR');

-- CreateEnum
CREATE TYPE "ProcessStatus" AS ENUM ('EM_ANDAMENTO', 'CONCLUIDO', 'ARQUIVADO', 'CANCELADO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('OFICIO', 'MEMORANDO', 'PORTARIA', 'DECRETO', 'REQUERIMENTO', 'PARECER', 'DESPACHO', 'NOTA_TECNICA');

-- CreateEnum
CREATE TYPE "SignatureType" AS ENUM ('DIGITAL', 'FISICA');

-- CreateEnum
CREATE TYPE "TramitacaoStatus" AS ENUM ('ENVIADO', 'RECEBIDO', 'DEVOLVIDO');

-- CreateTable
CREATE TABLE "secretarias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "secretarias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'SERVIDOR',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "secretaria_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processos" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "tipo" "DocumentType" NOT NULL,
    "assunto" TEXT NOT NULL,
    "status" "ProcessStatus" NOT NULL DEFAULT 'PENDENTE',
    "interessado" TEXT NOT NULL,
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "secretaria_origem_id" TEXT NOT NULL,
    "criador_id" TEXT NOT NULL,

    CONSTRAINT "processos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" "DocumentType" NOT NULL,
    "conteudo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processo_id" TEXT NOT NULL,
    "criado_por_id" TEXT NOT NULL,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assinaturas" (
    "id" TEXT NOT NULL,
    "signatario" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "tipo" "SignatureType" NOT NULL DEFAULT 'DIGITAL',
    "valida" BOOLEAN NOT NULL DEFAULT true,
    "data_assinatura" TIMESTAMP(3) NOT NULL,
    "documento_id" TEXT NOT NULL,

    CONSTRAINT "assinaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anexos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "url" TEXT,
    "data_upload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documento_id" TEXT NOT NULL,

    CONSTRAINT "anexos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tramitacoes" (
    "id" TEXT NOT NULL,
    "despacho" TEXT,
    "status" "TramitacaoStatus" NOT NULL DEFAULT 'ENVIADO',
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_recebimento" TIMESTAMP(3),
    "processo_id" TEXT NOT NULL,
    "setor_origem_id" TEXT NOT NULL,
    "setor_destino_id" TEXT NOT NULL,
    "responsavel_id" TEXT NOT NULL,

    CONSTRAINT "tramitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notas_internas" (
    "id" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "privada" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processo_id" TEXT NOT NULL,
    "autor_id" TEXT NOT NULL,

    CONSTRAINT "notas_internas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "secretarias_sigla_key" ON "secretarias"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "processos_numero_key" ON "processos"("numero");

-- CreateIndex
CREATE INDEX "processos_status_idx" ON "processos"("status");

-- CreateIndex
CREATE INDEX "processos_tipo_idx" ON "processos"("tipo");

-- CreateIndex
CREATE INDEX "processos_secretaria_origem_id_idx" ON "processos"("secretaria_origem_id");

-- CreateIndex
CREATE INDEX "processos_created_at_idx" ON "processos"("created_at");

-- CreateIndex
CREATE INDEX "documentos_processo_id_idx" ON "documentos"("processo_id");

-- CreateIndex
CREATE INDEX "assinaturas_documento_id_idx" ON "assinaturas"("documento_id");

-- CreateIndex
CREATE INDEX "anexos_documento_id_idx" ON "anexos"("documento_id");

-- CreateIndex
CREATE INDEX "tramitacoes_processo_id_idx" ON "tramitacoes"("processo_id");

-- CreateIndex
CREATE INDEX "tramitacoes_setor_origem_id_idx" ON "tramitacoes"("setor_origem_id");

-- CreateIndex
CREATE INDEX "tramitacoes_setor_destino_id_idx" ON "tramitacoes"("setor_destino_id");

-- CreateIndex
CREATE INDEX "notas_internas_processo_id_idx" ON "notas_internas"("processo_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretarias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos" ADD CONSTRAINT "processos_secretaria_origem_id_fkey" FOREIGN KEY ("secretaria_origem_id") REFERENCES "secretarias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos" ADD CONSTRAINT "processos_criador_id_fkey" FOREIGN KEY ("criador_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_criado_por_id_fkey" FOREIGN KEY ("criado_por_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_documento_id_fkey" FOREIGN KEY ("documento_id") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anexos" ADD CONSTRAINT "anexos_documento_id_fkey" FOREIGN KEY ("documento_id") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tramitacoes" ADD CONSTRAINT "tramitacoes_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tramitacoes" ADD CONSTRAINT "tramitacoes_setor_origem_id_fkey" FOREIGN KEY ("setor_origem_id") REFERENCES "secretarias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tramitacoes" ADD CONSTRAINT "tramitacoes_setor_destino_id_fkey" FOREIGN KEY ("setor_destino_id") REFERENCES "secretarias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tramitacoes" ADD CONSTRAINT "tramitacoes_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notas_internas" ADD CONSTRAINT "notas_internas_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notas_internas" ADD CONSTRAINT "notas_internas_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
