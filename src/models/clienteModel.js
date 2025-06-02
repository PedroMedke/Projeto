const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATEONLY
    },
    rg: {
        type: DataTypes.STRING(20)
    },
    cpf: {
        type: DataTypes.STRING(14),
        unique: true
    },
    telefone: {
        type: DataTypes.STRING(20)
    },
    endereco: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.STRING(10)
    },
    cidade: {
        type: DataTypes.STRING(100)
    },
    uf: {
        type: DataTypes.STRING(2)
    },
    cep: {
        type: DataTypes.STRING(9)
    }
}, {
    tableName: 'clientes',
    timestamps: false
});

module.exports = Cliente;
