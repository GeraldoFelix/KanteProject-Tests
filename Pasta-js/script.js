// Função para obter parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Capturar os parâmetros da música e do artista
const musica = getQueryParam('musica');
const artista = getQueryParam('artista');

// Atualizar a página com os dados da música
if (musica && artista) {
    document.getElementById('titulo').innerText = musica;
    document.getElementById('artista').innerText = artista;

    // Chamar a API para buscar a letra da música
    fetch(`http://127.0.0.1:5000/letra?musica=${encodeURIComponent(musica)}&artista=${encodeURIComponent(artista)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('letra').innerText = data.lyrics || "Letra não encontrada.";
        })
        .catch(error => {
            document.getElementById('letra').innerText = "Erro ao carregar a letra.";
        });
} else {
    document.getElementById('letra').innerText = "Parâmetros inválidos.";
}
