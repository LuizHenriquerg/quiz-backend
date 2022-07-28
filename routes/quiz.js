const router = require('express').Router();
const { create, get_dados } = require('../controllers/QuizController');
const verificado = require('../utils/VerificaToken');

router.post('/quiz', verificado, create);
router.get('/quiz/:id?', get_dados);

module.exports = router;