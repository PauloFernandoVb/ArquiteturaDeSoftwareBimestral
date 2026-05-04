document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAlterar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("usuarioNome").style["border-color"] = "#ced4da";
        document.getElementById("usuarioEmail").style["border-color"] = "#ced4da";
        document.getElementById("usuarioSenha").style["border-color"] = "#ced4da";
        document.getElementById("usuarioPerfil").style["border-color"] = "#ced4da";
        document.getElementById("erroNome").textContent = "";
        document.getElementById("erroEmail").textContent = "";
        document.getElementById("erroSenha").textContent = "";
        document.getElementById("erroPerfil").textContent = "";
    }

    function cadastrar() {
        limparValidacao();

        let id = document.querySelector("#usuarioId").value;
        let nome = document.querySelector("#usuarioNome").value;
        let email = document.querySelector("#usuarioEmail").value;
        let senha = document.querySelector("#usuarioSenha").value;
        let perfil = document.querySelector("#usuarioPerfil").value;
        let ativo = document.querySelector("#usuarioAtivo").checked;

        let listaErros = [];
        let mensagensErro = [];
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(nome == "" || nome.length <= 6 || /\d/.test(nome)) {
            listaErros.push("usuarioNome");
            mensagensErro.push({campo: "erroNome", msg: "O nome deve ter mais de 6 letras e não conter números."});
        }
        if(email == "" || !regex.test(email)) {
            listaErros.push("usuarioEmail");
            mensagensErro.push({campo: "erroEmail", msg: "O email deve ser válido (ex: usuario@dominio.com)."});
        }
        if(senha == "" || senha.length <= 6) {
            listaErros.push("usuarioSenha");
            mensagensErro.push({campo: "erroSenha", msg: "A senha deve ter mais de 6 caracteres."});
        }
        if(perfil == 0) {
            listaErros.push("usuarioPerfil");
            mensagensErro.push({campo: "erroPerfil", msg: "Selecione um perfil válido."});
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                id: id,
                nome: nome,
                email: email,
                senha: senha,
                ativo: ativo,
                perfilId: perfil,
            }

            fetch("/usuarios/alterar", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok) {
                    window.location.href="/usuarios";
                }   
                else {
                    alert(r.msg);
                }
            })
        }
        else{
            //avisar sobre o preenchimento incorreto
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            for(let erro of mensagensErro) {
                document.getElementById(erro.campo).textContent = erro.msg;
            }
        }
    }

})