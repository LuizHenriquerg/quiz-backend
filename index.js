const express = require('express');
const app = express();

const db = require('./utils/Database');

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

///////////////////// ROTAS //////////////////////////
const usuario_routers = require('./routes/usuario');
app.use('/user', usuario_routers);

const quiz_routers = require('./routes/quiz');
app.use('/game', quiz_routers);
/////////////////////////////////////////////////////

app.listen(80, () => console.log('Running...'));
