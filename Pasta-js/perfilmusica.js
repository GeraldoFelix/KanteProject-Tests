document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nomeMusica = urlParams.get("musica");
    const nomeArtista = urlParams.get("artista");

    if (!nomeMusica || !nomeArtista) {
        console.error("Parâmetros da URL ausentes.");
        return;
    }

    try {
        const resposta = await fetch("../musicas.json"); // Certifique-se de que este caminho está correto
        if (!resposta.ok) throw new Error("Erro ao carregar o JSON");
        const dados = await resposta.json();

        // Encontra o artista correto
        const artista = dados.artistas.find(a => a.nome === nomeArtista);
        if (!artista) {
            console.error("Artista não encontrado:", nomeArtista);
            return;
        }

        // Encontra a música correta
        const musica = artista.musicas.find(m => m.titulo === nomeMusica);
        if (!musica) {
            console.error("Música não encontrada:", nomeMusica);
            return;
        }

        // Atualiza a página com os dados da música
        document.getElementById("musica-nome").textContent = musica.titulo;
        document.getElementById("artista-nome").textContent = artista.nome;
        
        // CORREÇÃO: Substituir '\n' por '<br>' para manter a formatação da letra
        document.getElementById("musica-letra").innerHTML = musica.letra.replace(/\n/g, "<br>");

        function getEmbedURL(url) {
            try {
                let videoID = "";
                let params = "";
        
                if (url.includes("youtube.com/watch?v=")) {
                    const urlObj = new URL(url);
                    videoID = urlObj.searchParams.get("v");
                    params = urlObj.searchParams.toString();
                } else if (url.includes("youtu.be/")) {
                    const splitURL = url.split("youtu.be/");
                    videoID = splitURL[1].split("?")[0];
                    params = splitURL[1].includes("?") ? splitURL[1].split("?")[1] : "";
                } else if (url.includes("youtube.com/embed/")) {
                    return url; // Já está no formato correto
                }
        
                return videoID ? `https://www.youtube.com/embed/${videoID}${params ? "?" + params : ""}` : "";
            } catch (error) {
                console.error("Erro ao processar a URL do YouTube:", error);
                return "";
            }
        }
        
        
        
        const embedURL = getEmbedURL(musica.youtube);
    console.log("URL Embed:", embedURL); // Para debug
    document.getElementById("musica-video").src = embedURL;

    } catch (erro) {
        console.error("Erro ao carregar JSON:", erro);
    }
});
