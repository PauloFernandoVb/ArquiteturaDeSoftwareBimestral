// const Database = require("../db/database.js");
const PerfilModel = require("../models/perfilModel");

// const banco = new Database();
//==============================================
//AQUI NAO VAI MAIS INSTANCIAR COM O BANCO, VAI INSTANCIAR COM O REPOSITORY

class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioSenha;
    #usuarioAtivo;
    #perfilId;
    //implementar getter e setter
    get usuarioId() {
        return this.#usuarioId;
    }
    set usuarioId(usuarioId) {
        this.#usuarioId = usuarioId
    }
    get usuarioNome() {
        return this.#usuarioNome;
    }
    set usuarioNome(usuarioNome) {
        this.#usuarioNome = usuarioNome;
    }

    get usuarioEmail() {
        return this.#usuarioEmail;
    }
    set usuarioEmail(usuarioEmail) {
        this.#usuarioEmail = usuarioEmail;
    }

    get usuarioSenha() {
        return this.#usuarioSenha;
    }

    set usuarioSenha(usuarioSenha) {
        this.#usuarioSenha = usuarioSenha;
    }
    get perfilId() {
        return this.#perfilId;
    }

    set perfilId(perfilId) {
        this.#perfilId = perfilId;
    }

    get usuarioAtivo() {
        return this.#usuarioAtivo;
    }
    set usuarioAtivo(usuarioAtivo) {
        this.#usuarioAtivo = usuarioAtivo;
    }

    //implementar construtor
    constructor(usuarioId, usuarioNome, usuarioEmail, usuarioSenha, usuarioAtivo, perfilId) {
        this.#usuarioId = usuarioId;
        this.#usuarioNome = usuarioNome;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioSenha = usuarioSenha;
        this.#usuarioAtivo = usuarioAtivo;
        this.#perfilId = perfilId;
    }

    static toMap(row) {
        let usuario = new UsuarioModel(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"], new PerfilModel(row["per_id"]))
    }

}

module.exports = UsuarioModel;