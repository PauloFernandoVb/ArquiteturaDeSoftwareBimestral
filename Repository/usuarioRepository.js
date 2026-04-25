
const UsuarioModel = require("../models/usuarioModel");
const Repository = require("./Repository");

class UsuarioRepository extends Repository {

    constructor() {
        super();
    }

    async obterPorEmailSenha(email, senha) {
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";

        let valores = [email, senha];

        let rows = await this.banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"], row["per_id"]);
        }

        return null;
    }

    async listar() {

        let sql = "select * from tb_usuario";

        let rows = await this.banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new UsuarioModel(rows[i]["usu_id"], rows[i]["usu_nome"], rows[i]["usu_email"], rows[i]["usu_senha"], rows[i]["usu_ativo"], rows[i]["per_id"]));
        }
        return lista;
    }

    async cadastrar() {
        if (this.#usuarioId == 0) {
            let sql = "insert into tb_usuario (usu_email, usu_nome, usu_senha, usu_ativo, per_id) values (?,?,?,?,?)";

            let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "update tb_usuario set usu_email = ?, usu_nome = ?, usu_senha = ?, usu_ativo = ?, per_id = ? where usu_id = ?";

            let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId, this.#usuarioId];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async obter(id) {
        let sql = "select * from tb_usuario where usu_id = ?";

        let valores = [id];

        let rows = await this.banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"], row["per_id"]);
        }

        return null;
    }

    async excluir(id) {
        let sql = "delete from tb_usuario where usu_id = ?";

        let valores = [id];

        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = UsuarioRepository;