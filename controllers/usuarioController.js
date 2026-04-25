const PerfilModel = require("../models/perfilModel");
const PerfilRepository = require("../Repository/perfilRepository")
const UsuarioModel = require("../models/usuarioModel");
const UsuarioRepository = require("../Repository/usuarioRepository")

class UsuarioController {

    #Usuario;
    #Perfil;


    constructor() {
        this.#Usuario = new UsuarioRepository();
        this.#Perfil = new PerfilRepository();

    }


    async listagemView(req, resp) {
        let entidades = await this.#Usuario.listar();
        // let usuario = new UsuarioModel();
        // let listaUsuarios = await usuario.listar()

        resp.render("usuarios/listagem", { lista: entidades });
        // resp.render("usuarios/listagem", { lista: listaUsuarios });
    }

    async cadastroView(req, resp) {
        let entidades = await this.#Perfil.listar();
        // let perfil = new PerfilModel();
        // let listaPerfil = await perfil.listar();
        resp.render("usuarios/cadastro", { listaPerfil: entidades });
    }

    async cadastrar(req, resp) {
        let msg = "";
        let cor = "";
        if (req.body.email != "" && req.body.senha != "" && req.body.nome != "" &&
            req.body.perfil != '0') {
            let usuario = new UsuarioModel(0, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil);

            let result = await this.#Usuario.cadastrar();

            if (result) {
                resp.send({
                    ok: true,
                    msg: "Usuário cadastrado com sucesso!"
                });
            }
            else {
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar usuário!"
                });
            }
        }
        else {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }

    }

    async alterarView(req, res) {
        console.log(req.params);

        // let perfil = new PerfilModel();

        let listaPerfil = await this.#Perfil.listar();

        // let usuario = new UsuarioModel();

        usuario = await this.#Usuario.obter(req.params.id);

        res.render('usuarios/alterar', { usuario: usuario, listaPerfil: listaPerfil });
    }

    async excluir(req, res) {
        if (req.body.id != null) {
            // let usuario = new UsuarioModel();
            let ok = await this.#Usuario.excluir(req.body.id);
            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir usuário" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" })
        }
    }

    async alterar(req, res) {
        let msg = "";
        let cor = "";
        if (req.body.id > 0 && req.body.email != "" && req.body.senha != "" && req.body.nome != "" &&
            req.body.perfil != '0') {


            ///===================================================
            //FIQUEI COM DUVIDA AQUI PQ NO FULLSTACK 2 USA DESSE JEIT SEM O REQ
            //let { nome, email, ativo, senha, perfil } = req.body;
            // let entidade = new UsuarioEntity(0, nome, email, ativo, senha, new PerfilEntity(perfil.id));
            ///===================================================
            let usuario = new UsuarioModel(req.body.id, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil);

            let result = await this.#Usuario.cadastrar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Usuário alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar usuário!"
                });
            }
        }
        else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }
}

module.exports = UsuarioController;