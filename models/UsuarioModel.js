const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
    {
        nome: String,
        senha: String,
        email: String,
        pontos: Number
    }
);

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;