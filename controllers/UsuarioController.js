const UsuarioModel = require('../models/UsuarioModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    signup: async (req, res, next) => {
        let { nome, email, senha, senha2 } = req.body;

        if (email == undefined || email == '') {
            res.json({'status': 'erro', 'mensagem': 'Email não informado/inválido.'})
        }

        if (nome == undefined || nome == '') {
            res.json({'status': 'erro', 'mensagem': 'Nome não informado/inválido.'})
        }

        if (senha == undefined || senha == '') {
            res.json({'status': 'erro', 'mensagem': 'Senha não informado/inválida.'})
        }

        if (senha != senha2) {
            res.json({'status': 'erro', 'mensagem': 'Senhas não condizem.'})
        }

        const salt = await bcrypt.genSalt(10);
	    const hashedPassword = await bcrypt.hash(senha, salt);

        try {
            await new UsuarioModel({
                nome,
                email,
                senha: hashedPassword,
                pontos: 0
            }).save()

            res.json({'status': 'sucesso', 'mensagem': 'Usuário criado com sucesso!'})

        } catch (erro) {
            res.status(500).send(erro)
        }
    },
    login: async (req, res) => {
        const { email, senha } = req.body;

        const usuario = await UsuarioModel.findOne({ email: email });
        if (!usuario) return res.status(400).send('Email/Senha incorretos.');

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(400).send('Email/Senha incorretos.');

        const token = jwt.sign({ _id: usuario._id }, 'cachorro quente');

        res.header('auth-token', token).send(token);
    },
    info: async (req, res) => {

        try {
            const usuario = await UsuarioModel.find({_id: new mongoose.Types.ObjectId(req.usuario._id)});

            res.json({email: usuario[0].email, nome: usuario[0].nome})
        } catch (erro) {
            res.status(500).send(erro)
        }
    }
}