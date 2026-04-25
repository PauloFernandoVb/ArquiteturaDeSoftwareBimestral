var mysql = require('mysql2');

class Database {

    #conexao;

    get conexao() { return this.#conexao; }
    set conexao(conexao) { this.#conexao = conexao; }

    constructor() {
        //novo
        if (Database.#instance) {
            throw new Error("Use Database.getInstance() para obter a instância do banco de dados.");
        }
        this.#conexao = mysql.createPool({
            host: '132.226.245.178', 
            database: 'ATIVIDADE_10442427754', 
            user: '10442427754', 
            password: '10442427754',
            waitForConnections: true,
            connectionLimit: 50, 
            queueLimit: 0 
        });    }
    ///novo
    static getInstance() {
        if (!Database.#instance) { Database.#instance = new Database(); }
        return Database.#instance;
    }


    ExecutaComando(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function (res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results);
            });
        })
    }

    ExecutaComandoNonQuery(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function (res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results.affectedRows > 0);
            });
        })
    }

    ExecutaComandoLastInserted(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function (res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results.insertId);
            });
        })
    }

}

module.exports = Database;



