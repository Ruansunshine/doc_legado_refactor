/*
  Warnings:

  - You are about to drop the `anexos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assinaturas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notas_internas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `processos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `secretarias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tramitacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "anexos" DROP CONSTRAINT "anexos_documento_id_fkey";

-- DropForeignKey
ALTER TABLE "assinaturas" DROP CONSTRAINT "assinaturas_documento_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_criado_por_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_processo_id_fkey";

-- DropForeignKey
ALTER TABLE "notas_internas" DROP CONSTRAINT "notas_internas_autor_id_fkey";

-- DropForeignKey
ALTER TABLE "notas_internas" DROP CONSTRAINT "notas_internas_processo_id_fkey";

-- DropForeignKey
ALTER TABLE "processos" DROP CONSTRAINT "processos_criador_id_fkey";

-- DropForeignKey
ALTER TABLE "processos" DROP CONSTRAINT "processos_secretaria_origem_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tramitacoes" DROP CONSTRAINT "tramitacoes_processo_id_fkey";

-- DropForeignKey
ALTER TABLE "tramitacoes" DROP CONSTRAINT "tramitacoes_responsavel_id_fkey";

-- DropForeignKey
ALTER TABLE "tramitacoes" DROP CONSTRAINT "tramitacoes_setor_destino_id_fkey";

-- DropForeignKey
ALTER TABLE "tramitacoes" DROP CONSTRAINT "tramitacoes_setor_origem_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_secretaria_id_fkey";

-- DropTable
DROP TABLE "anexos";

-- DropTable
DROP TABLE "assinaturas";

-- DropTable
DROP TABLE "documentos";

-- DropTable
DROP TABLE "notas_internas";

-- DropTable
DROP TABLE "processos";

-- DropTable
DROP TABLE "secretarias";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "tramitacoes";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "DocumentType";

-- DropEnum
DROP TYPE "ProcessStatus";

-- DropEnum
DROP TYPE "SignatureType";

-- DropEnum
DROP TYPE "TramitacaoStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "assunto" (
    "id" VARCHAR NOT NULL,
    "assunto" VARCHAR,
    "descricao" VARCHAR,
    "id_fluxo" VARCHAR,

    CONSTRAINT "assunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contato" (
    "id" VARCHAR NOT NULL,
    "nome" VARCHAR,
    "razao_social" VARCHAR,
    "email" VARCHAR,
    "tipo_pessoa" VARCHAR,
    "cpf_cnpj" VARCHAR,
    "ddd" VARCHAR,
    "telefone" VARCHAR,
    "ddd_celular" VARCHAR,
    "celular" VARCHAR,
    "data_nasc" VARCHAR,
    "data_cadastro" VARCHAR,
    "hora_cadastro" VARCHAR,
    "status" VARCHAR,
    "contato" VARCHAR,
    "organizacao" VARCHAR,
    "funcao" VARCHAR,
    "endereco" VARCHAR,
    "numero" VARCHAR,
    "complemento" VARCHAR,
    "cep" VARCHAR,
    "bairro" VARCHAR,
    "cidade" VARCHAR,
    "uf" VARCHAR,

    CONSTRAINT "contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doc" (
    "id" VARCHAR NOT NULL,
    "id_fluxo" VARCHAR,
    "ano_documento" VARCHAR,
    "num" VARCHAR,
    "ano" VARCHAR,
    "mes" VARCHAR,
    "dia" VARCHAR,
    "assunto" VARCHAR,
    "conteudo" VARCHAR,
    "codigo" VARCHAR,
    "pasta" VARCHAR,
    "de_usuario_id" VARCHAR,
    "de_setor_id" VARCHAR,
    "para_usuario_id" VARCHAR,
    "para_setor_id" VARCHAR,
    "de_contato_id" VARCHAR,
    "para_contato_id" VARCHAR,
    "data" VARCHAR,
    "hora" VARCHAR,
    "data_hora_recebimento_gmt" VARCHAR,
    "prioridade" VARCHAR,

    CONSTRAINT "doc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doc_meta" (
    "id_doc" VARCHAR NOT NULL,
    "meta" VARCHAR NOT NULL,
    "valor" VARCHAR,

    CONSTRAINT "doc_meta_pkey" PRIMARY KEY ("id_doc","meta")
);

-- CreateTable
CREATE TABLE "doc_setor" (
    "id" VARCHAR NOT NULL,
    "id_setor" VARCHAR,
    "id_doc" VARCHAR,

    CONSTRAINT "doc_setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fluxo" (
    "id" VARCHAR NOT NULL,
    "fluxo" VARCHAR,
    "grupo" VARCHAR,
    "status" VARCHAR,

    CONSTRAINT "fluxo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" VARCHAR NOT NULL,
    "secretaria" TEXT NOT NULL DEFAULT 'DEFAULT',
    "setor" VARCHAR,
    "sigla" VARCHAR,
    "status" VARCHAR,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subdoc" (
    "id" VARCHAR NOT NULL,
    "id_doc" VARCHAR,
    "num" VARCHAR,
    "ano_documento" VARCHAR,
    "ano" VARCHAR,
    "mes" VARCHAR,
    "dia" VARCHAR,
    "conteudo" VARCHAR,
    "codigo" VARCHAR,
    "pasta" VARCHAR,
    "de_usuario_id" VARCHAR,
    "de_setor_id" VARCHAR,
    "para_usuario_id" VARCHAR,
    "para_setor_id" VARCHAR,
    "de_contato_id" VARCHAR,
    "para_contato_id" VARCHAR,
    "data" VARCHAR,
    "hora" VARCHAR,
    "data_hora_recebimento_gmt" VARCHAR,

    CONSTRAINT "subdoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR,
    "nome" VARCHAR,
    "status" VARCHAR,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_setor" (
    "id" VARCHAR NOT NULL,
    "id_usuario" VARCHAR,
    "id_setor" VARCHAR,
    "principal" VARCHAR,

    CONSTRAINT "usuario_setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT DEFAULT 'DEFAULT',
    "password" TEXT,
    "isTwoFactorAuthEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorAuthVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anexo" (
    "id_anexo" VARCHAR NOT NULL,
    "id_subdoc" VARCHAR,
    "id_doc" VARCHAR,
    "anexo" VARCHAR,

    CONSTRAINT "anexo_pkey" PRIMARY KEY ("id_anexo")
);

-- CreateTable
CREATE TABLE "assinatura" (
    "id" VARCHAR NOT NULL,
    "id_subdoc" VARCHAR,
    "id_doc" VARCHAR,
    "id_usuario" VARCHAR,
    "id_contato" VARCHAR,
    "data" VARCHAR,
    "hora" VARCHAR,
    "arquivo_assinado" VARCHAR,
    "tipo" VARCHAR,

    CONSTRAINT "assinatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doc_assunto" (
    "id" VARCHAR NOT NULL,
    "id_assunto" VARCHAR,
    "id_doc" VARCHAR,

    CONSTRAINT "doc_assunto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_key" ON "VerificationToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_key" ON "TwoFactorToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_email_key" ON "ResetPasswordToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_token_key" ON "ResetPasswordToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_email_token_key" ON "ResetPasswordToken"("email", "token");

-- AddForeignKey
ALTER TABLE "assunto" ADD CONSTRAINT "assunto_id_fluxo_fkey" FOREIGN KEY ("id_fluxo") REFERENCES "fluxo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc" ADD CONSTRAINT "doc_de_contato_id_fkey" FOREIGN KEY ("de_contato_id") REFERENCES "contato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc" ADD CONSTRAINT "doc_de_setor_id_fkey" FOREIGN KEY ("de_setor_id") REFERENCES "setor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc" ADD CONSTRAINT "doc_de_usuario_id_fkey" FOREIGN KEY ("de_usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc" ADD CONSTRAINT "doc_id_fluxo_fkey" FOREIGN KEY ("id_fluxo") REFERENCES "fluxo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc" ADD CONSTRAINT "doc_para_contato_id_fkey" FOREIGN KEY ("para_contato_id") REFERENCES "contato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc" ADD CONSTRAINT "doc_para_setor_id_fkey" FOREIGN KEY ("para_setor_id") REFERENCES "setor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc" ADD CONSTRAINT "doc_para_usuario_id_fkey" FOREIGN KEY ("para_usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_meta" ADD CONSTRAINT "doc_meta_id_doc_fkey" FOREIGN KEY ("id_doc") REFERENCES "doc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_setor" ADD CONSTRAINT "doc_setor_id_doc_fkey" FOREIGN KEY ("id_doc") REFERENCES "doc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_setor" ADD CONSTRAINT "doc_setor_id_setor_fkey" FOREIGN KEY ("id_setor") REFERENCES "setor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subdoc" ADD CONSTRAINT "subdoc_de_contato_id_fkey" FOREIGN KEY ("de_contato_id") REFERENCES "contato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subdoc" ADD CONSTRAINT "subdoc_de_setor_id_fkey" FOREIGN KEY ("de_setor_id") REFERENCES "setor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subdoc" ADD CONSTRAINT "subdoc_de_usuario_id_fkey" FOREIGN KEY ("de_usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subdoc" ADD CONSTRAINT "subdoc_id_doc_fkey" FOREIGN KEY ("id_doc") REFERENCES "doc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subdoc" ADD CONSTRAINT "subdoc_para_contato_id_fkey" FOREIGN KEY ("para_contato_id") REFERENCES "contato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subdoc" ADD CONSTRAINT "subdoc_para_setor_id_fkey" FOREIGN KEY ("para_setor_id") REFERENCES "setor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subdoc" ADD CONSTRAINT "subdoc_para_usuario_id_fkey" FOREIGN KEY ("para_usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario_setor" ADD CONSTRAINT "usuario_setor_id_setor_fkey" FOREIGN KEY ("id_setor") REFERENCES "setor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario_setor" ADD CONSTRAINT "usuario_setor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anexo" ADD CONSTRAINT "anexo_id_doc_fkey" FOREIGN KEY ("id_doc") REFERENCES "doc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anexo" ADD CONSTRAINT "anexo_id_subdoc_fkey" FOREIGN KEY ("id_subdoc") REFERENCES "subdoc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assinatura" ADD CONSTRAINT "assinatura_id_contato_fkey" FOREIGN KEY ("id_contato") REFERENCES "contato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assinatura" ADD CONSTRAINT "assinatura_id_doc_fkey" FOREIGN KEY ("id_doc") REFERENCES "doc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assinatura" ADD CONSTRAINT "assinatura_id_subdoc_fkey" FOREIGN KEY ("id_subdoc") REFERENCES "subdoc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assinatura" ADD CONSTRAINT "assinatura_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_assunto" ADD CONSTRAINT "doc_assunto_id_assunto_fkey" FOREIGN KEY ("id_assunto") REFERENCES "assunto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_assunto" ADD CONSTRAINT "doc_assunto_id_doc_fkey" FOREIGN KEY ("id_doc") REFERENCES "doc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
