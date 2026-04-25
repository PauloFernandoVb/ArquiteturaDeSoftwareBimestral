document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("buscar").addEventListener("click", carregarPedidos);

    carregarPedidos();

    document.getElementById("excel").addEventListener("click", exportarExcel);

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("pedidos"));

        XLSX.writeFile(wb, "joaopedro.xlsx");
    }

    function carregarPedidos() {
        let query = "";
        let termo = document.getElementById("inputBusca");
        if(termo.value != "") {
            query = "?termo=" + termo.value;
        }
        //faz o fetch para obter a lista de pedidos
        fetch("/pedido/listar" + query)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(corpo) {
            console.log(corpo);
            let html = "";
            if(corpo.lista.length > 0) {
                for(let i =0; i < corpo.lista.length; i++) {
                    let item = corpo.lista[i];
                    html += `<tr>
                                <td>${item.pedido}</td>
                                <td>${new Date(item.data).toLocaleString()}</td>
                                <td>${item.produto}</td>
                                <td>${item.quantidade}</td>
                                <td>R$ ${item.valorUnitario}</td>
                                <td>R$ ${item.valorTotal ? item.valorTotal : "0"}</td>
                            </tr>`;
                }

                document.querySelector("#pedidos > tbody").innerHTML = html;

            }
        })
    }
})