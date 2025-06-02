CREATE TABLE clientes (
    codigo SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    rg VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    numero VARCHAR(10),
    cidade VARCHAR(100),
    uf CHAR(2),
    cep VARCHAR(9)
);
