-- Script SQL para criar tabelas tb_perfil e tb_usuario com PK, FK e constraints
-- Baseado nos modelos usuarioModel.js e perfilModel.js

-- Criar tabela tb_perfil
CREATE TABLE tb_perfil (
    per_id INT PRIMARY KEY AUTO_INCREMENT,
    per_nome VARCHAR(255) NOT NULL
);

-- Criar tabela tb_usuario
CREATE TABLE tb_usuario (
    usu_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_nome VARCHAR(255) NOT NULL,
    usu_email VARCHAR(255) NOT NULL UNIQUE,
    usu_senha VARCHAR(255) NOT NULL,
    usu_ativo BOOLEAN NOT NULL DEFAULT 1,
    per_id INT NOT NULL,
    FOREIGN KEY (per_id) REFERENCES tb_perfil(per_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserir 2 perfis
INSERT INTO tb_perfil (per_nome) VALUES ('Administrador');
INSERT INTO tb_perfil (per_nome) VALUES ('Usuário Comum');

-- Inserir 2 usuários (senhas fictícias, em produção devem ser hashadas)
INSERT INTO tb_usuario (usu_email, usu_nome, usu_senha, usu_ativo, per_id) 
VALUES ('admin@pfs.com', 'Admin PFS', 'senha123', 1, 1);

INSERT INTO tb_usuario (usu_email, usu_nome, usu_senha, usu_ativo, per_id) 
VALUES ('user@pfs.com', 'Usuário PFS', 'senha456', 1, 2);