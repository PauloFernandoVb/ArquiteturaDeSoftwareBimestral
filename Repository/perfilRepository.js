

const Database = require("../db/database");
const PerfilModel = require("../models/perfilModel");

class PerfilRepository {

    constructor() {
        this.banco = Database.getInstance();
    }

    async listar() {

        let sql = "select * from tb_perfil";
        let rows = await this.banco.ExecutaComando(sql);
        return rows;
    }
}

module.exports = PerfilRepository;