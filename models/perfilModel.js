const PerfilRepository = require("../Repository/perfilRepository");

class PerfilModel {
    
    #banco;

    #id;
    #descricao;

    get banco() { return this.#banco }
    set banco(banco) { this.#banco = banco }
    get id() { return this.#id }
    set id(id) { this.#id = id }
    get descricao() { return this.#descricao }
    set descricao(descricao) { this.#descricao = descricao }

    constructor(banco, id, descricao) {
        this.#id = id;
        this.#descricao = descricao;

        this.#banco = banco;
    }

    // mapeia row do banco para objeto
    static toMap(row, banco) {
        return new PerfilModel(banco,row["per_id"], row["per_nome"]);
    }
    // lista perfis do banco
    async listar() {
        const repo = new PerfilRepository(this.#banco);
        let lista = [];
        let rows = await repo.listar();

        for (let row of rows) {
            lista.push(PerfilModel.toMap(row, this.#banco))
        }
        return lista
    }

    // prepara objeto simples para json
    toJSON() {
        return {
            id: this.#id,
            descricao: this.#descricao
        }
    }
}

module.exports = PerfilModel;