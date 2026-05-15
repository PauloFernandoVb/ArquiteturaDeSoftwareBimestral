const PerfilModel = require("../models/perfilModel");
const Banco = require("../db/database");
class PerfilController {

    static #instance;

    static getInstance() {
        if (!PerfilController.#instance) {
            PerfilController.#instance = new PerfilController();
        }
        return PerfilController.#instance;
    }

    async listagemView(req, res) {
        const banco = Banco.getInstance();

        try {
            let perfil = new PerfilModel(banco);
            let lista = await perfil.listar();

            res.render('perfil/listagem', {
                listaPerfil: lista
            });
        } catch (erro) {
            res.status(500).send({ ok: false, msg: "Erro ao conectar ao banco de dados" });
        }

    }
}

module.exports = PerfilController;