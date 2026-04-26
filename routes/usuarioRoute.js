const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

let router = express.Router();
let ctrl = UsuarioController.getInstance();

router.get('/', ctrl.listagemView.bind(ctrl));
router.get('/cadastrar', ctrl.cadastroView.bind(ctrl));
router.post('/cadastrar', ctrl.cadastrar.bind(ctrl));
router.get('/alterar/:id', ctrl.alterarView.bind(ctrl));
router.post("/alterar", ctrl.alterar.bind(ctrl));
router.post("/excluir", ctrl.excluir.bind(ctrl));

module.exports = router;
