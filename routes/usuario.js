const router = require('express').Router();
const { signup, login, info } = require('../controllers/UsuarioController');
const verificado = require('../utils/VerificaToken');

router.post('/signup', signup);
router.post('/login', login);
router.get('/dados', verificado, info);

module.exports = router;