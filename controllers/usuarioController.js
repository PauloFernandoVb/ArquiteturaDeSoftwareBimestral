const PerfilModel = require("../models/perfilModel");
const UsuarioModel = require("../models/usuarioModel");
const Banco = require("../db/database");

class UsuarioController {
    static #instance;

    static getInstance() {
        if (!UsuarioController.#instance) {
            UsuarioController.#instance = new UsuarioController();
        }
        return UsuarioController.#instance;
    }
    //fecha so para pegar uma instancia
    constructor() {
    }
    //finalizar aqui as funçoes
    async listagemView(req, res) {
        // lista usuarios para a tela
        const banco = Banco.getInstance();
        
        try {
            let usuario = new UsuarioModel(banco);
            let lista = await usuario.listar();
            res.render("usuarios/listagem", { lista });
        } catch (erro) {
            res.status(500).send({ ok: false, msg: "Erro ao conectar ao banco de dados" });
        }
    }

    async cadastroView(req, res) {
        //carrega perfis para o cadastro
        const banco = Banco.getInstance();
        
        try {
            let perfil = new PerfilModel(banco);
            let listaPerfil = await perfil.listar();

            res.render("usuarios/cadastro", { listaPerfil });
        } catch (erro) {
            res.status(500).send({ ok: false, msg: "Erro ao conectar ao banco de dados" });
        }
    }

    // validacao simples de email
    emailValido(email) {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async cadastrar(req, res) {
        const banco = Banco.getInstance();
        
        let ok = true;
        let msg;
        // monta usuario com dados do form
        try {
            let usuario = new UsuarioModel(
                banco,
                0, req.body.nome, req.body.email, req.body.senha, req.body.ativo, new PerfilModel(banco, req.body.perfil)
            );

            if (!this.emailValido(req.body.email)) {
                ok = false;
                msg = "Email inválido";
            }
            if (ok && !usuario.validar()) {
                ok = false;
                msg = "Parâmetros preenchidos incorretamente!";
            }
            if (ok && !await usuario.validarEmail()) {
                ok = false
                msg = "Email já cadastrado!";
            }
            if (ok && !await usuario.cadastrar()) {
                ok = false;
                msg = 'Erro ao cadastrar!';
            }
            if (ok)
                msg = 'Cadastrado com Sucesso!';
            res.send({ ok, msg })
        } catch (erro) {
            res.status(500).send({ ok: false, msg: "Erro ao conectar ao banco de dados" }); 
         }

    }

    async alterarView(req, res) {
        console.log(req.params);
        const banco = Banco.getInstance();
        
        try {
            let usuario = new UsuarioModel(banco);
            let entidade = await usuario.obter(req.params.id);

            let perfil = new PerfilModel(banco);
            let listaPerfil = await perfil.listar();

            res.render('usuarios/alterar', { usuario: entidade, listaPerfil });
        } catch (erro) {
            res.status(500).send({ ok: false, msg: "Erro ao conectar ao banco de dados" });
        }

    }

    async excluir(req, res) {
        if (req.body.id) {
            const banco = Banco.getInstance();
            
            try {
                // exclui usuario pelo id
                let usuario = new UsuarioModel(banco);
                let result = await usuario.excluir(req.body.id);

                if (result) {
                    res.send({ ok: true, msg: "Excluido com sucesso" });
                }
                else {
                    res.status(500).send({ ok: false, msg: "Erro ao excluir" });
                }
            } catch (erro) {
                res.status(500).send({ ok: false, msg: "Erro ao conectar ao banco de dados" });
            }
        } else {
            res.status(400).send({ ok: false, msg: "ID não enviado" });
        }
    }

    async alterar(req, res) {
        const banco = Banco.getInstance();
        
        try {
            let usuario = new UsuarioModel(banco,
                req.body.id, req.body.nome, req.body.email, req.body.senha,
                req.body.ativo, new PerfilModel(banco, req.body.perfilId));

            if (!this.emailValido(req.body.email)) {
                return res.status(400).send({ ok: false, msg: "Email inválido" });
            }

            if (usuario.validar()) {
                let result = await usuario.cadastrar();
                if (result) {
                    res.send({ ok: true, msg: "Alterado com sucesso" });
                }
                else {
                    res.status(500).send({ ok: false, msg: "Erro ao alterar" });
                }
            } else {
                res.status(400).send({ ok: false, msg: "Dados inválidos" });
            }
        } catch (erro) {
            res.status(500).send({ ok: false, msg: "Erro ao conectar ao banco de dados" });
         }

    }

}
    

module.exports = UsuarioController;