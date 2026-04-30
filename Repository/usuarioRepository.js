
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
            return UsuarioModel.toMap(rows[0]);
        }

        return null;
    }

    async listar() {

        let sql = "select * from tb_usuario";

        let rows = await this.banco.ExecutaComando(sql);
        let lista = [];

        for (let row of rows) {
            console.log(UsuarioModel)
            lista.push(UsuarioModel.toMap(row));
        }
        return lista;
    }

    async cadastrar(usuario) {
        if (usuario.id == 0) {
            let sql = "insert into tb_usuario (usu_email, usu_nome, usu_senha, usu_ativo, per_id) values (?,?,?,?,?)";

            let valores = [usuario.email, usuario.nome, usuario.senha, usuario.ativo, usuario.perfilId];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "update tb_usuario set usu_email = ?, usu_nome = ?, usu_senha = ?, usu_ativo = ?, per_id = ? where usu_id = ?";

            let valores = [usuario.email, usuario.nome, usuario.senha, usuario.ativo, usuario.perfilId, usuario.id];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async obter(id) {
        let sql = "select * from tb_usuario where usu_id = ?";

        let valores = [id];

        let rows = await this.banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            return UsuarioModel.toMap(rows[0]);
        }
        return null;
    }

    async excluir(id) {
        let sql = "delete from tb_usuario where usu_id = ?";
        let valores = [id];

        return await this.banco.ExecutaComandoNonQuery(sql, valores);
    }

}

module.exports = UsuarioRepository;