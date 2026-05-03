const UsuarioRepository = require("../Repository/usuarioRepository");
const PerfilModel = require("../models/perfilModel")

class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioSenha;
    #usuarioAtivo;
    #perfil;


    get usuarioId() { return this.#usuarioId; }
    set usuarioId(usuarioId) { this.#usuarioId = usuarioId }
    get usuarioNome() { return this.#usuarioNome; }
    set usuarioNome(usuarioNome) { this.#usuarioNome = usuarioNome; }
    get usuarioEmail() { return this.#usuarioEmail; }
    set usuarioEmail(usuarioEmail) { this.#usuarioEmail = usuarioEmail; }
    get usuarioSenha() { return this.#usuarioSenha; }
    set usuarioSenha(usuarioSenha) { this.#usuarioSenha = usuarioSenha; }
    get perfil() { return this.#perfil; }
    set perfil(perfil) { this.#perfil = perfil; }
    get usuarioAtivo() { return this.#usuarioAtivo; }
    set usuarioAtivo(usuarioAtivo) { this.#usuarioAtivo = usuarioAtivo; }

    //implementar construtor
    constructor(usuarioId, usuarioNome, usuarioEmail, usuarioSenha, usuarioAtivo, perfil) {
        this.#usuarioId = usuarioId;
        this.#usuarioNome = usuarioNome;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioSenha = usuarioSenha;
        this.#usuarioAtivo = usuarioAtivo;
        this.#perfil = perfil;
    }
    async cadastrar() {
        const repo = new UsuarioRepository();
        return await repo.cadastrar(this);
    }

    async obter(id) {
        const repo = new UsuarioRepository();
        let rows = await repo.obter(id);

        if(rows.length>0)
            return UsuarioModel.toMap(rows[0]);
    }

    async obterPorEmailSenha(email, senha) {
        const repo = new UsuarioRepository();
        let rows = await repo.obterPorEmailSenha(email, senha);
        
        if(rows.length>0)
            return UsuarioModel.toMap(rows[0])
        return null
    }

    // lista usando as rows cruas do repo
    async listar() {
        const repo = new UsuarioRepository();
        let lista = [];
        let rows =  await repo.listar();
       
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
        let perfilVal = (this.#perfil && this.#perfil.perfil) ? this.#perfil.perfil : this.#perfil;
        return this.#usuarioNome != "" &&
            this.#usuarioEmail != "" &&
            this.#usuarioSenha != "" &&
            perfilVal != null && perfilVal != 0;
    }
    // mapeia row do banco para objeto
    static toMap(row) {
        return new UsuarioModel(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"], new PerfilModel(row["per_id"], row["per_nome"]));
    }
    // prepara objeto simples para json
    toJSON(){
        return {
            usuarioId: this.#usuarioId,
            usuarioNome: this.#usuarioNome,
            usuarioEmail: this.#usuarioEmail,
            usuarioSenha: this.#usuarioSenha,
            usuarioAtivo: this.#usuarioAtivo,
            perfil: this.#perfil
        }
    }

}

module.exports = UsuarioModel;
