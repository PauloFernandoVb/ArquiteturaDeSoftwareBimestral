const UsuarioRepository = require("../Repository/usuarioRepository");

class LoginController {

    loginView(req, res) {
        // abre tela de login
        res.render('login/index', { layout: 'login/index' });
    }

    async login(req, res) {
        let msg = "";
        if (req.body.email != null && req.body.password != null) {
            // valida usuario no banco
            const repo = new UsuarioRepository();
            let usuario = await repo.obterPorEmailSenha(req.body.email, req.body.password);
            if (usuario != null) {
                res.cookie("usuarioLogado", usuario.id);
                return res.redirect("/");
            }
            else {
                msg = "Usuário/Senha incorretos!";
            }
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }

        res.render('login/index', { msg });
    }
}

module.exports = LoginController;