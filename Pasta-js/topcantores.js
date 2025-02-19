async function carregarArtistas() {
    try {
        const resposta = await fetch("https://kanteproject-tests.onrender.com/api/artistas");
        if (!resposta.ok) throw new Error("Erro ao buscar os artistas.");

        const dados = await resposta.json();
        console.log("Artistas carregados:", dados); 

        const container = document.getElementById("container-cantores");

        if (dados.length === 0) {
            container.innerHTML = "<p>Nenhum artista encontrado.</p>";
            return;
        }

        dados.forEach(artista => {
            const div = document.createElement("div");
            div.classList.add("organizador");
            div.onclick = () => selecionarArtista(artista.id, artista.name, artista.image);

            div.innerHTML = `
                <img src="../Imagens/Botao_play.png" class="botao-tocar">
                <img src="${artista.image}" class="imagens" alt="${artista.name})">
                <p>${artista.name}</p>
            `;

            container.appendChild(div);
        });
    } catch (erro) {
        console.error("Erro ao carregar artistas:", erro);
    }
}
function selecionarArtista(id, name, image) {
    localStorage.setItem("artistaSelecionado", id);
    localStorage.setItem("artistaNome", name);
    localStorage.setItem("artistaImagem", image);
    window.location.href = "perfil_artista.html";
}

document.addEventListener("DOMContentLoaded", carregarArtistas);
