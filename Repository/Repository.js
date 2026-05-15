
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

    constructor(banco) {
        if(!banco){
            throw new Error("Banco de dados não fornecido para o repositório");
        }
        this.#banco = banco;
    }

}

module.exports = Repository;