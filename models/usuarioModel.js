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

    // lista usando as rows cruas do repo
    async listar2() {
        const repo = new UsuarioRepository();
        let lista = [];
        let rows =  await repo.listar2();
       
        for (let row of rows) {
            //console.log(UsuarioModel)
            lista.push(UsuarioModel.toMap(row));
        }
        return lista
    }

    async excluir(id) {
        const repo = new UsuarioRepository();
        return await repo.excluir(id);
    }

    // valida dados basicos do usuario
    validar() {
        let perfilIdVal = (this.#perfilId && this.#perfilId.perfilId) ? this.#perfilId.perfilId : this.#perfilId;
        return this.#usuarioNome != "" &&
            this.#usuarioEmail != "" &&
            this.#usuarioSenha != "" &&
            perfilIdVal != null && perfilIdVal != 0;
    }
    // mapeia row do banco para objeto
    static toMap(row) {
        return new UsuarioModel(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"], new PerfilModel(row["per_id"], row["per_nome"]));
    }
    // prepara objeto simples para json
    toJSON(){
        let perfil = null;
        if (this.#perfilId) {
            perfil = (this.#perfilId.perfilId) ? { perfilId: this.#perfilId.perfilId, perfilDescricao: this.#perfilId.perfilDescricao } : this.#perfilId;
        }
        return {
            usuarioId: this.#usuarioId,
            usuarioNome: this.#usuarioNome,
            usuarioEmail: this.#usuarioEmail,
            usuarioSenha: this.#usuarioSenha,
            usuarioAtivo: this.#usuarioAtivo,
            perfilId: perfil
        }
    }

}

module.exports = UsuarioModel;
