const PerfilRepository = require("../Repository/perfilRepository");

class PerfilModel {

    #id;
    #descricao;

    get id() { return this.#id }
    set id(id) { this.#id = id }
    get descricao() { return this.#descricao }
    set descricao(descricao) { this.#descricao = descricao }

    constructor(id, descricao) {
        this.#id = id;
        this.#descricao = descricao;
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
            id: this.#id,
            descricao: this.#descricao
        }
    }
}

module.exports = PerfilModel;