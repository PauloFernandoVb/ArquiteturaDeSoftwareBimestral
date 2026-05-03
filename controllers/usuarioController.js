const PerfilRepository = require("../Repository/perfilRepository")
const UsuarioModel = require("../models/usuarioModel");

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
        //this.perfilRepo = new PerfilRepository();
    }

    //finalizar aqui as funçoes
    async listagemView(req, res) {
        // lista usuarios para a tela
        let usuario = new UsuarioModel();
        let lista = await usuario.listar();
        console.log(lista)
        res.render("usuarios/listagem", { lista: lista });
    }

    async cadastroView(req, res) {
        // carrega perfis para o cadastro
        let listaPerfil = await this.perfilRepo.listar();

        res.render("usuarios/cadastro", { listaPerfil });
    }

    async cadastrar(req, res) {

        // monta usuario com dados do form
        let usuario = new UsuarioModel(
            0, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil
        );

        if (usuario.validar()) {
            let result = await usuario.cadastrar();

            if (result) {
                res.send({ ok: true, msg: "Cadastrado com sucesso!" })
            } else {
                res.send({ ok: false, msg: "Erro ao cadastrar!" });
            }
        } else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });

        }

    }
    async alterarView(req, res) {
        console.log(req.params);

        // carrega usuario e perfis para editar
        let usuario = new UsuarioModel();
        let entidade = await usuario.obter(req.params.id);
        let listaPerfil = await this.perfilRepo.listar();

        res.render('usuarios/alterar', { usuario: entidade, listaPerfil });
    }

    async excluir(req, res) {
        if (req.body.id) {

            // exclui usuario pelo id
            let usuario = new UsuarioModel();
            let result = await usuario.excluir(req.body.id);

            if (result) {
                res.send({ ok: true, msg: "Excluido com sucesso" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir" });
            }

        } else {
            res.send({ ok: false, msg: "ID não enviado" });
        }
    }

    async alterar(req, res) {

        // monta usuario com dados do form
        let usuario = new UsuarioModel(
            req.body.id, req.body.nome, req.body.email, req.body.senha,
            req.body.ativo, req.body.perfil);

        if (usuario.validar()) {

            let result = await usuario.cadastrar();

            if (result) {
                res.send({ ok: true, msg: "Alterado com sucesso" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao alterar" });
            }
        } else {
            res.send({ ok: false, msg: "Dados inválidos" });
        }
    }

}

module.exports = UsuarioController;