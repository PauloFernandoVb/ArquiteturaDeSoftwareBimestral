
//classe para deixar uma unica instancia de banco

const Banco = require("../db/database");

class Repository {
    #banco;


    get banco() {
        return this.#banco;
    }
    set banco(banco) {
        this.#banco = banco;
    }

    constructor() {
        this.#banco = new Banco.getInstance();
    }

}

module.exports = Repository;