const UsuarioRepository = require("../Repository/usuarioRepository");
const PerfilModel = require("../models/perfilModel")

class UsuarioModel {
    #banco;
    #id;
    #nome;
    #email;
    #senha;
    #ativo;
    #perfil;

    get banco() { return this.#banco }
    set banco(banco) { this.#banco = banco }
    get id() { return this.#id; }
    set id(id) { this.#id = id; }
    get nome() { return this.#nome; }
    set nome(nome) { this.#nome = nome; }
    get email() { return this.#email; }
    set email(email) { this.#email = email; }
    get senha() { return this.#senha; }
    set senha(senha) { this.#senha = senha; }
    get perfil() { return this.#perfil; }
    set perfil(perfil) { this.#perfil = perfil; }
    get ativo() { return this.#ativo; }
    set ativo(ativo) { this.#ativo = ativo; }

    //implementar construtor
    constructor(banco, id, nome, email, senha, ativo, perfil) {
        this.#banco = banco;
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#ativo = ativo;
        this.#perfil = perfil;
    }
    async cadastrar() {
        const repo = new UsuarioRepository(this.#banco);
        return await repo.cadastrar(this);
    }

    async obter(id) {
        const repo = new UsuarioRepository(this.#banco);
        let rows = await repo.obter(id);

        if (rows.length > 0)
            return UsuarioModel.toMap(rows[0]);
    }

    async obterPorEmailSenha(email, senha) {
        const repo = new UsuarioRepository(this.#banco);
        let rows = await repo.obterPorEmailSenha(email, senha);

        if (rows.length > 0)
            return UsuarioModel.toMap(rows[0])
        return null
    }
    //retorna false se já tiver um email igual cadastrado
    async validarEmail() {
        const repo = new UsuarioRepository(this.#banco);
        return await repo.validarEmail(this.#email);
    }

    // lista usando as rows cruas do repo
    async listar() {
        const repo = new UsuarioRepository(this.#banco);
        let lista = [];
        let rows = await repo.listar();

        for (let row of rows) {
            //console.log(UsuarioModel)
            lista.push(UsuarioModel.toMap(row));
        }
        return lista
    }
    async excluir(id) {
        const repo = new UsuarioRepository(this.#banco);
        return await repo.excluir(id);
    }

    // valida dados basicos do usuario
    validar() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let perfilVal = (this.#perfil && this.#perfil.id) ? this.#perfil : null;
        if (this.#nome != "" && this.#email != "" && regex.test(this.#email) && this.#senha != "" && perfilVal != null && perfilVal != 0)
            return true;
        return false;
    }
    // mapeia row do banco para objeto
    static toMap(row, banco) {
        return new UsuarioModel(banco, row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"], new PerfilModel(row["per_id"], row["per_nome"]));
    }
    // prepara objeto simples para json
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            senha: this.#senha,
            ativo: this.#ativo,
            perfil: this.#perfil
        }
    }

}

module.exports = UsuarioModel;
