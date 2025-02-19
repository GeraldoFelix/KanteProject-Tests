async function carregarMusicas() {
    try {      
        const resposta = await fetch("https://kanteproject-tests.onrender.com/api/musicas");
        if (!resposta.ok) throw new Error("Erro ao buscar as músicas.");

        const musicas = await resposta.json();
        console.log("Músicas carregadas:", musicas);

        const container = document.querySelector(".container-imagemusicas");
        container.innerHTML = ""; 

        if (musicas.length === 0) {
            container.innerHTML = "<p>Nenhuma música encontrada.</p>";
            return;
        }

        musicas.forEach(musica => {
            const div = document.createElement("div");
            div.classList.add("organizador");
            div.onclick = () => irParaMusica(musica.name, musica.artist); // Chama a função ao clicar

            div.innerHTML = `
                <img src="../Imagens/Botao_play.png" class="botao-tocar">
                <img src="${musica.image}" class="imagens" alt="${musica.name}">
                <p>${musica.name}</p>
                <p class="artista">${musica.artist}</p>
            `;

            container.appendChild(div);
        });
    } catch (erro) {
        console.error("Erro ao carregar músicas:", erro);
    }
}

// Função para redirecionar o usuário para a página da música
function irParaMusica(musica, artista) {
    const url = `perfilmusica.html?musica=${encodeURIComponent(musica)}&artista=${encodeURIComponent(artista)}`;
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", carregarMusicas);
