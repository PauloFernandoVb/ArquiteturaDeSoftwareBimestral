const PerfilModel = require("../models/perfilModel");

class PerfilController {

    static #instance;

    static getInstance() {
        if (!PerfilController.#instance) {
            PerfilController.#instance = new PerfilController();
        }
        return PerfilController.#instance;
    }

    async listagemView(req, res) {

        let perfil = new PerfilModel();
        let lista = await perfil.listar();

        res.render('perfil/listagem', {
            listaPerfil: lista
        });
    }
}

module.exports = PerfilController;