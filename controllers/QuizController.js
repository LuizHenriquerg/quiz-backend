const mongoose = require('mongoose');
const QuizModel = require('../models/QuizModel');

module.exports = {
    create: async (req, res, next) => {
        const { categoria, nivel, perguntas } = req.body;

        if (categoria == undefined || categoria == '') {
            return res.json({'status': 'erro', 'mensagem': 'Categoria não informado/inválido.'})
        }

        if (nivel == undefined || nivel == '') {
            return res.json({'status': 'erro', 'mensagem': 'Nivel do quiz não informado/inválido.'})
        }

        try {
            await new QuizModel({
                categoria,
                nivel,
                perguntas: perguntas,
                id_usuario: new mongoose.Types.ObjectId(req.usuario._id)
            }).save()

            return res.json({'status': 'sucesso', 'mensagem': 'Quiz criado com sucesso!'})

        } catch (erro) {
            return res.status(500).json({'status': 'erro', 'mensagem': erro})
        }
    },
    get_dados: async (req, res, next) => {
        const id_usuario = req.params.id;
        let query = {}

        if (id_usuario != undefined) {
            query = {id_usuario: new mongoose.Types.ObjectId(id_usuario)};
        }

        let response = await QuizModel.find(query);

        return res.json(response);
    }
}