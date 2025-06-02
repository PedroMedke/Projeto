const Cliente = require('../models/clienteModel');
const { Op } = require('sequelize');

const validarCPF = (cpf) => /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf);
const validarCEP = (cep) => /^\d{5}-\d{3}$/.test(cep);
const validarTelefone = (telefone) => /^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/.test(telefone);

module.exports = {
    async criarCliente(req, res) {
        try {
            const { nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep } = req.body;

            if (!nome) return res.status(400).json({ erro: "O campo nome é obrigatório." });
            if (!validarCPF(cpf)) return res.status(400).json({ erro: "CPF inválido. Formato esperado: XXX.XXX.XXX-XX" });
            if (cep && !validarCEP(cep)) return res.status(400).json({ erro: "CEP inválido. Formato esperado: XXXXX-XXX" });
            if (telefone && !validarTelefone(telefone)) return res.status(400).json({ erro: "Telefone inválido. Formato esperado: (XX)XXXXX-XXXX" });

            const cpfExistente = await Cliente.findOne({ where: { cpf } });
            if (cpfExistente) return res.status(400).json({ erro: "CPF já cadastrado." });

            const cliente = await Cliente.create({
                nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep
            });

            return res.status(201).json(cliente);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor." });
        }
    },

    async obterCliente(req, res) {
        try {
            const { codigo } = req.params;
            const cliente = await Cliente.findByPk(codigo);

            if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado." });

            return res.status(200).json(cliente);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor." });
        }
    },

    async listarClientes(req, res) {
        try {
            const { nome, cidade, uf } = req.query;

            const where = {};
            if (nome) where.nome = { [Op.iLike]: `%${nome}%` };
            if (cidade) where.cidade = { [Op.iLike]: `%${cidade}%` };
            if (uf) where.uf = uf.toUpperCase();

            const clientes = await Cliente.findAll({ where });

            return res.status(200).json(clientes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor." });
        }
    },

    async atualizarCliente(req, res) {
        try {
            const { codigo } = req.params;
            const dados = req.body;

            const cliente = await Cliente.findByPk(codigo);
            if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado." });

            if (dados.cpf) {
                if (!validarCPF(dados.cpf)) return res.status(400).json({ erro: "CPF inválido." });

                const cpfExistente = await Cliente.findOne({
                    where: { cpf: dados.cpf, codigo: { [Op.ne]: codigo } }
                });
                if (cpfExistente) return res.status(400).json({ erro: "CPF já cadastrado por outro cliente." });
            }

            if (dados.cep && !validarCEP(dados.cep)) return res.status(400).json({ erro: "CEP inválido." });
            if (dados.telefone && !validarTelefone(dados.telefone)) return res.status(400).json({ erro: "Telefone inválido." });

            await cliente.update(dados);

            return res.status(200).json(cliente);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor." });
        }
    },

    async deletarCliente(req, res) {
        try {
            const { codigo } = req.params;
            const cliente = await Cliente.findByPk(codigo);

            if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado." });

            await cliente.destroy();

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor." });
        }
    }
};
