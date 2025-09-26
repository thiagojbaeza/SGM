-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
-- Host: localhost    Database: sgm
-- ------------------------------------------------------
-- Server version	8.0.33
-- Criação do Banco de dados do Sistema de Gestão de Manutenção - SGM

CREATE DATABASE `sgm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- sgm.tb_login definition

CREATE TABLE `tb_login` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `ds_nome_usuario` varchar(100) NOT NULL,
  `ds_senha` varchar(20) NOT NULL,
  `id_tipo_usuario` int NOT NULL,
  `fg_ativo` int NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `id_usuario_criacao` int DEFAULT NULL,
  `dt_ultima_alteracao` datetime DEFAULT NULL,
  `id_usuario_ultima_alteracao` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- sgm.tb_tipo_usuario definition

CREATE TABLE `tb_tipo_usuario` (
  `id_tipo_usuario` int NOT NULL AUTO_INCREMENT,
  `ds_tipo_usuario` varchar(30) NOT NULL,
  `fg_ativo` int NOT NULL DEFAULT '1',
  `dt_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_criacao` int NOT NULL,
  `dt_ultima_alteracao` datetime DEFAULT NULL,
  `id_usuario_ultima_alteracao` int DEFAULT NULL,
  PRIMARY KEY (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- sgm.tb_motivo_refugo definition

CREATE TABLE `tb_motivo_refugo` (
  `id_motivo_refugo` int NOT NULL AUTO_INCREMENT,
  `ds_motivo_refugo` varchar(70) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `id_usuario_criacao` int NOT NULL,
  `dt_ultima_alteracao` datetime DEFAULT NULL,
  `id_usuario_ultima_alteracao` int DEFAULT NULL,
  `fg_ativo` int NOT NULL,
  PRIMARY KEY (`id_motivo_refugo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- sgm.tb_produto definition

CREATE TABLE `tb_produto` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `cd_produto` varchar(100) NOT NULL,
  `ds_produto` varchar(100) NOT NULL,
  `ds_diametro` varchar(5) NOT NULL,
  `nr_qtd_chapa` decimal(10,0) NOT NULL,
  `ds_perda_padrao` varchar(5) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `id_usuario_criacao` int NOT NULL,
  `dt_ultima_alteracao` datetime DEFAULT NULL,
  `id_usuario_ultima_alteracao` int DEFAULT NULL,
  `fg_ativo` int NOT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- sgm.tb_maquina definition

CREATE TABLE `tb_maquina` (
  `id_maquina` int NOT NULL AUTO_INCREMENT,
  `cd_maquina` varchar(100) NOT NULL,
  `ds_nome_maquina` varchar(100) NOT NULL,
  `nr_disponibilidade_maquina` decimal(10,0) NOT NULL,
  `nr_parada_programada` decimal(10,0) NOT NULL,
  `nr_parada_nao_programada` decimal(10,0) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `id_usuario_criacao` int NOT NULL,
  `dt_ultima_alteracao` datetime DEFAULT NULL,
  `id_usuario_ultima_alteracao` int DEFAULT NULL,
  `fg_ativo` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_maquina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- sgm.tb_status_maquina definition

CREATE TABLE `tb_status_maquina` (
  `id_status_maquina` int NOT NULL AUTO_INCREMENT,
  `ds_status_maquina` varchar(60) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `id_usuario_criacao` int NOT NULL,
  `dt_ultima_alteracao` datetime DEFAULT NULL,
  `id_usuario_ultima_alteracao` int DEFAULT NULL,
  `fg_ativo` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_status_maquina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- sgm.tb_motivo_pausa definition

CREATE TABLE `tb_motivo_pausa` (
  `id_motivo_pausa` int NOT NULL AUTO_INCREMENT,
  `ds_motivo_pausa` varchar(50) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `id_usuario_criacao` int NOT NULL,
  `dt_ultima_alteracao` datetime DEFAULT NULL,
  `id_usuario_ultima_alteracao` int DEFAULT NULL,
  `fg_ativo` int NOT NULL,
  PRIMARY KEY (`id_motivo_pausa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;