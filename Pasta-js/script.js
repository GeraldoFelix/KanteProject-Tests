async function buscarArtistas() {
    try {
        const response = await fetch("http://127.0.0.1:5000/top-artistas");  // Chama a API do Flask
        const artistas = await response.json();

        const lista = document.getElementById("lista-artistas");
        lista.innerHTML = "";  // Limpa a lista antes de adicionar novos artistas

        artistas.forEach(artista => {
            const div = document.createElement("div");
            div.classList.add("organizador");

            div.innerHTML = `
                <img src="../Imagens/Botao_play.png" class="botao-tocar">
                <img src="${artista.imagem}" class="imagens" alt="${artista.nome}">
                <p>${artista.nome}</p>
            `;

            lista.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao buscar artistas:", error);
    }
}

// Carrega os artistas quando a página terminar de carregar
document.addEventListener("DOMContentLoaded", buscarArtistas);
