const perfilRepository = require("../Repository/perfilRepository");

class PerfilModel {

    #perfilId;
    #perfilDescricao;

    get perfilId() { return this.#perfilId }
    set perfilId(perfilId) { this.#perfilId = perfilId }
    get perfilDescricao() { return this.#perfilDescricao }
    set perfilDescricao(perfilDescricao) { this.#perfilDescricao = perfilDescricao }

    constructor(perfilId, perfilDescricao) {
        this.#perfilId = perfilId;
        this.#perfilDescricao = perfilDescricao;
    }

    static toMap(row) {
        return new PerfilModel(row["per_id"], row["per_nome"]);
    }
    async listar() {
        const repo = new PerfilRepository();
        return await repo.listar();
    }
}

module.exports = PerfilModel;