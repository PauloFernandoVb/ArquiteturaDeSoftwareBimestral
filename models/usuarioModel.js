const UsuarioRepository = require("../Repository/usuarioRepository");
const PerfilModel = require("../models/perfilModel")

class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioSenha;
    #usuarioAtivo;
    #perfilId;


    get id() { return this.#usuarioId; }
    set id(usuarioId) { this.#usuarioId = usuarioId }
    get nome() { return this.#usuarioNome; }
    set nome(usuarioNome) { this.#usuarioNome = usuarioNome; }
    get email() { return this.#usuarioEmail; }
    set email(usuarioEmail) { this.#usuarioEmail = usuarioEmail; }
    get senha() { return this.#usuarioSenha; }
    set senha(usuarioSenha) { this.#usuarioSenha = usuarioSenha; }
    get perfilId() { return this.#perfilId; }
    set perfilId(perfilId) { this.#perfilId = perfilId; }
    get ativo() { return this.#usuarioAtivo; }
    set ativo(usuarioAtivo) { this.#usuarioAtivo = usuarioAtivo; }

    //implementar construtor
    constructor(usuarioId, usuarioNome, usuarioEmail, usuarioSenha, usuarioAtivo, perfilId) {
        this.#usuarioId = usuarioId;
        this.#usuarioNome = usuarioNome;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioSenha = usuarioSenha;
        this.#usuarioAtivo = usuarioAtivo;
        this.#perfilId = perfilId;
    }
    async cadastrar() {
        const repo = new UsuarioRepository();
        return await repo.cadastrar(this);
    }

    async obter(id) {
        const repo = new UsuarioRepository();
        return await repo.obter(id);
    }

    async listar() {
        const repo = new UsuarioRepository();
        return await repo.listar();
    }

    async excluir(id) {
        const repo = new UsuarioRepository();
        return await repo.excluir(id);
    }

    validar() {
        return this.#usuarioNome != "" &&
            this.#usuarioEmail != "" &&
            this.#usuarioSenha != "" &&
            this.#perfilId != 0;
    }
    static toMap(row) {
        return new UsuarioModel(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"], new PerfilModel(row["per_id"]));
    }

}

module.exports = UsuarioModel;
