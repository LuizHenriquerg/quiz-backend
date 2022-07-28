const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema(
    {
        categoria: String,
        nivel: String,
        perguntas: [{ 
            enunciado: String, 
            respostas: [{
                resposta: String,
                correta: Boolean,
                _id: false
            }],
            _id: false
        }],
        id_usuario: mongoose.ObjectId
    }
);

const QuizModel = mongoose.model('quiz', QuizSchema);

module.exports = QuizModel;