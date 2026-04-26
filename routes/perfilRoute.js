const express = require('express');
const PerfilController = require('../controllers/perfilController');

let router = express.Router();
let ctrl = PerfilController.getInstance();

router.get('/', ctrl.listagemView.bind(ctrl));

module.exports = router;