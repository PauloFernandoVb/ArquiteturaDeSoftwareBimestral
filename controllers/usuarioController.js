const PerfilModel = require("../models/perfilModel");
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
    }

    //finalizar aqui as funçoes
    async listagemView(req, res) {
        // lista usuarios para a tela
        let usuario = new UsuarioModel();
        let lista = await usuario.listar();
        res.render("usuarios/listagem", { lista });
    }

    async cadastroView(req, res) {
        // carrega perfis para o cadastro
        let perfil = new PerfilModel();
        let listaPerfil = await perfil.listar();

        res.render("usuarios/cadastro", { listaPerfil });
    }

    async cadastrar(req, res) {
        let ok = true;
        let msg;
        // monta usuario com dados do form
        let usuario = new UsuarioModel(
            0, req.body.nome, req.body.email, req.body.senha, req.body.ativo, new PerfilModel(req.body.perfil)
        );
        
        if (!usuario.validar()) {
            ok = false;
            msg = "Parâmetros preenchidos incorretamente!";
        }
        if(ok && !await usuario.validarEmail()){
            ok = false
            msg= "Email já cadastrado!";
        }
        if(ok && !await usuario.cadastrar()){
            ok = false;
            msg= 'Erro ao cadastrar!';
        }
        if(ok)
            msg= 'Cadastrado com Sucesso!';
        res.send({ok,msg})
    }
    
    async alterarView(req, res) {
        console.log(req.params);

        // carrega usuario e perfis para editar
        let usuario = new UsuarioModel();
        let entidade = await usuario.obter(req.params.id);

        let perfil = new PerfilModel();
        let listaPerfil = await perfil.listar();

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
            req.body.ativo, new PerfilModel(req.body.perfilId));

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