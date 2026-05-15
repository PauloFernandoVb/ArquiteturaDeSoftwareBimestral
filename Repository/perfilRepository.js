

const Database = require("../db/database");
const PerfilModel = require("../models/perfilModel");

class PerfilRepository {

    constructor(banco) {
        this.banco = banco;
    }

    async listar() {

        let sql = "select * from tb_perfil";
        let rows = await this.banco.ExecutaComando(sql);
        return rows;
    }
}

module.exports = PerfilRepository;