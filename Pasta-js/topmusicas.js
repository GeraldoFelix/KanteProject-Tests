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

            div.innerHTML = `
                <img src="../Imagens/Botao_play.png" class="botao-tocar">
                <a href="musica.html?musica=${encodeURIComponent(musica.name)}&artista=${encodeURIComponent(musica.artist)}">
                    <img src="${musica.image}" class="imagens" alt="${musica.name}">
                </a>
                <p>${musica.name}</p>
                <p class="artista">${musica.artist}</p>
            `;

            container.appendChild(div);
        });
    } catch (erro) {
        console.error("Erro ao carregar músicas:", erro);
    }
}

document.addEventListener("DOMContentLoaded", carregarMusicas);
