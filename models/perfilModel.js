const PerfilRepository = require("../Repository/perfilRepository");

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

    // mapeia row do banco para objeto
    static toMap(row) {
        return new PerfilModel(row["per_id"], row["per_nome"]);
    }
    // lista perfis do banco
    async listar() {
        const repo = new PerfilRepository();
        return await repo.listar();
    }
    
    // prepara objeto simples para json
    toJSON(){
        return {
            perfilId: this.#perfilId,
            perfilDescricao: this.#perfilDescricao
        }
    }
}

module.exports = PerfilModel;