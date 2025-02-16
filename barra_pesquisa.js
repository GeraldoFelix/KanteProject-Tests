// Lista de sugestões de pesquisa
const lista_sugestao = [
    "Engenheiros do Hawaii",
    "LemonSoda",
    "Shank",
    "Summer Salt",
    "Jack Stauber",
    "Michael Jackson",
    "The Beatles",
    "Queen",
    "Pink Floyd",
    "AC/DC"
];

function MostrarSugestao() {
    let input = document.getElementById("busca").value.toLowerCase();
    let containerSugestao = document.getElementById("sugest");

    // Limpa as sugestões anteriores
    containerSugestao.innerHTML = "";

    // Se o campo estiver vazio, oculta as sugestões
    if (input === "") {
        containerSugestao.style.display = "none";
        return;
    }

    // Filtra as sugestões com base no texto digitado
    let filtradoSugestao = lista_sugestao.filter(item =>
        item.toLowerCase().includes(input)
    );

    // Se houver sugestões, exibe a lista
    if (filtradoSugestao.length > 0) {
        containerSugestao.style.display = "block";

        filtradoSugestao.forEach(sugestEscolhida => {
            let div = document.createElement("div");
            div.innerHTML = sugestEscolhida;
            div.onclick = function () {
                document.getElementById("busca").value = sugestEscolhida;
                containerSugestao.style.display = "none";
            };

            containerSugestao.appendChild(div);
        });
        
    } else {
        containerSugestao.style.display = "none";
    }
}

// Fecha a lista de sugestões ao clicar fora
document.addEventListener("click", function(event) {
    if (!event.target.closest(".barra-pesquisa")) {
        document.getElementById("sugest").style.display = "none";
    }
});
