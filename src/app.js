const express = require('express');
const app = express();
const clienteRoutes = require('./routes/clienteRoutes');

app.use(express.json());
app.use('/api', clienteRoutes);

app.get('/', (req, res) => {
    res.send('API RESTful de Cadastro de Clientes');
});

module.exports = app;
