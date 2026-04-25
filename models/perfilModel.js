const Database = require('../db/database');

const banco = new Database();

class PerfilModel {

    #perfilId;
    #perfilDescricao;

    get perfilId() {
        return this.#perfilId
    }

    set perfilId(perfilId) {
        this.#perfilId = perfilId
    }

    get perfilDescricao() {
        return this.#perfilDescricao
    }

    set perfilDescricao(perfilDescricao) {
        this.#perfilDescricao = perfilDescricao
    }

    constructor(perfilId, perfilDescricao) {
        this.#perfilId = perfilId;
        this.#perfilDescricao = perfilDescricao;
    }

    static toMap(row) {
        let perfil = new PerfilModel(row["per_id"], row["per_nome"])
    }

}

module.exports = PerfilModel;