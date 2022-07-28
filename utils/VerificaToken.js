const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Accesso negado!')

    try {
        const verificado = jwt.verify(token, 'cachorro quente');

        req.usuario = verificado;

        next();
    } catch (erro) {
        res.status(400).send('Token inválido!')
    }
};