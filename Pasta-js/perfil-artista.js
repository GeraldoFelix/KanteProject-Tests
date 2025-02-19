const idSelecionado = localStorage.getItem("artistaSelecionado");
        const nomeSelecionado = localStorage.getItem("artistaNome");
        const imagemSelecionado = localStorage.getItem("artistaImagem");

async function carregarPerfil() {
    try {
    
        if (!idSelecionado) {
            alert("Nenhum artista selecionado!");
            window.location.href = "main.html"
            return;
        }

        const busca = await fetch("../musicas.json");
        if (!busca.ok) throw new Error("Erro ao carregar artistas.");

        const dados = await busca.json();

        const artista = dados.artistas.find(a => a.nome === nomeSelecionado);

        /*
        if (!artista) {
            console.error("Artista não encontrado:", nomeSelecionado);
            return;
        }
        */

        document.getElementById("artista-nome").textContent = artista.nome;
        document.getElementById("artista-imagem").src = imagemSelecionado;

        const containerImagens = document.getElementById("musicas-artista");

        dados.artistas.forEach(item => {

            if (item.nome == nomeSelecionado){
                console.log(item.musicas)

                item.musicas.forEach(musica => {
                    console.log(musica.titulo)

                    const div = document.createElement("div");
                    div.classList.add("seçao");
                    div.onclick = () => selecionarMusicaArtista(musica.capa, musica.titulo);
    
                    div.innerHTML = `
                        <img src=${musica.capa}>
                        <a> ${artista.nome}</a>
                        <p>${musica.titulo}</p>
                    `;
    
                    containerImagens.appendChild(div);
            

                });
            }
            });
            
    } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);
    }
}
function selecionarMusicaArtista(imagem, musica) {
    // Usando encodeURIComponent para garantir que os valores especiais sejam codificados corretamente
    localStorage.setItem("musicaNome", musica);
    localStorage.setItem("musicaImagem", imagem);

    // Redireciona para a página perfilmusica.html passando os parâmetros na URL
    const url = `perfilmusica.html?musica=${encodeURIComponent(musica)}&artista=${encodeURIComponent(nomeSelecionado)}`;
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", carregarPerfil);