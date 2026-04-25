

const Repository = require("./Repository");
const UsuarioModel = require("../models/usuarioModel");

class PerfilRepository extends Repository {

    constructor() {
        super();
    }

    async listar() {

        let sql = "select * from tb_perfil";

        let rows = await this.banco.ExecutaComando(sql);

        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            let perfil = new PerfilModel()

            perfil.perfilId = rows[i]["per_id"];
            perfil.perfilDescricao = rows[i]["per_nome"]

            lista.push(perfil);
        }

        return lista;
    }
}

module.exports = PerfilRepository;