async function carregarArtistas() {
    try {
        const resposta = await fetch("http://127.0.0.1:5000/api/artistas");
        if (!resposta.ok) throw new Error("Erro ao buscar os artistas.");

        const artistas = await resposta.json();
        console.log("Artistas carregados:", artistas); // Debug no console

        const container = document.querySelector(".container-imagens");
        container.innerHTML = ""; // Limpa os dados anteriores

        if (artistas.length === 0) {
            container.innerHTML = "<p>Nenhum artista encontrado.</p>";
            return;
        }

        artistas.forEach(artista => {
            const div = document.createElement("div");
            div.classList.add("organizador");

            div.innerHTML = `
                <img src="../Imagens/Botao_play.png" class="botao-tocar">
                <img src="${artista.image}" class="imagens" alt="${artista.name}">
                <p>${artista.name}</p>
            `;

            container.appendChild(div);
        });
    } catch (erro) {
        console.error("Erro ao carregar artistas:", erro);
    }
}

window.onload = carregarArtistas;