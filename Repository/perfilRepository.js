

const Database = require("../database/database");
const PerfilModel = require("../models/perfilModel");

class PerfilRepository {

    constructor() {
        this.banco = Database.getInstance();
    }

    async listar() {

        let sql = "select * from tb_perfil";
        let rows = await this.banco.ExecutaComando(sql);

        let lista = [];

        for (let row of rows) {
            lista.push(PerfilModel.toMap(row));
        }

        return lista;
    }
}

module.exports = PerfilRepository;